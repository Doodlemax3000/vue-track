import { db } from '@/services/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  where,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

export type Day = {
  date: string
  notes?: string
  mood?: string
}

export type Activity = {
  type: string
  value?: number
  unit?: string
  notes?: string
}

// ----------------------------------------------
// GENERAL REFERENCES
function dayRef(uid: string, date: string) {
  return doc(db, 'users', uid, 'days', date)
}

function activitiesRef(uid: string, date: string) {
  return collection(db, 'users', uid, 'days', date, 'activities')
}

// ----------------------------------------------
// DAY
export async function saveDay(uid: string, day: Day) {
  const ref = dayRef(uid, day.date)

  // using setDoc because our document ID is the date,
  // so we want to create or overwrite the document with that ID
  await setDoc(
    ref,
    {
      ...day,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )
}
// usage:
/*
await saveDay(user.uid, {
  date: '2026-06-07',
  notes: 'Good day overall.',
  mood: 'good',
})
*/

export async function getDay(uid: string, date: string) {
  const snapshot = await getDoc(dayRef(uid, date))

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}
// usage:
/*
const day = await getDay(user.uid, '2026-06-07')
*/

export async function getDays(uid: string) {
  const daysRef = collection(db, 'users', uid, 'days')
  const q = query(daysRef, orderBy('date', 'asc'))

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// ----------------------------------------------
// ACTIVITY
export async function addActivity(uid: string, date: string, activity: Activity) {
  const ref = await addDoc(activitiesRef(uid, date), {
    ...activity,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return ref.id
}
// usage:
/*
await addActivity(user.uid, '2026-06-07', {
  type: 'running',
  value: 5,
  unit: 'km',
  notes: 'Easy run.',
})
*/

export async function getActivities(uid: string, date: string) {
  const q = query(activitiesRef(uid, date), orderBy('createdAt', 'asc'))

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}
// usage:
/*
const activities = await getActivities(user.uid, '2026-06-07')
*/

export async function updateActivity(
  uid: string,
  date: string,
  activityId: string,
  data: Partial<Activity>,
) {
  const ref = doc(db, 'users', uid, 'days', date, 'activities', activityId)

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}
// usage:
/*
await updateActivity(user.uid, '2026-06-07', activityId, {
  value: 6,
  notes: 'Actually ran a bit more.',
})
*/

export async function deleteActivity(uid: string, date: string, activityId: string) {
  const ref = doc(db, 'users', uid, 'days', date, 'activities', activityId)

  await deleteDoc(ref)
}

// ----------------------------------------------
// DAYS WITH ACTIVITIES
export type CalendarActivity = {
  id: string
  type: string
  value: number
  unit: string
  notes?: string
}

export type CalendarDay = {
  id: string
  date: string
  notes?: string
  mood?: string
  activities: CalendarActivity[]
  color: string
  mainActivityType: string | null
}

function toDateId(date: Date) {
  return date.toISOString().slice(0, 10)
}

function activityColor(type: string | null) {
  switch (type) {
    case 'running':
      return 'bg-emerald-500'
    case 'study':
      return 'bg-sky-500'
    case 'gym':
      return 'bg-violet-500'
    case 'rest':
      return 'bg-zinc-500'
    default:
      return 'bg-zinc-800'
  }
}

export async function getCalendarDaysFromToday(
  uid: string,
  daysBack: number,
): Promise<CalendarDay[]> {
  const today = new Date()
  const start = new Date()

  start.setDate(today.getDate() - daysBack + 1)

  const startId = toDateId(start)
  const endId = toDateId(today)

  const daysRef = collection(db, 'users', uid, 'days')

  const daysQuery = query(
    daysRef,
    where('date', '>=', startId),
    where('date', '<=', endId),
    orderBy('date', 'asc'),
  )

  const daysSnapshot = await getDocs(daysQuery)

  const days = await Promise.all(
    daysSnapshot.docs.map(async (dayDoc) => {
      const dayData = dayDoc.data()

      const activitiesRef = collection(db, 'users', uid, 'days', dayDoc.id, 'activities')

      const activitiesSnapshot = await getDocs(activitiesRef)

      const activities = activitiesSnapshot.docs.map((activityDoc) => ({
        id: activityDoc.id,
        ...activityDoc.data(),
      })) as CalendarActivity[]

      const mainActivityType = activities[0]?.type ?? null

      return {
        id: dayDoc.id,
        date: String(dayData.date),
        notes: dayData.notes,
        mood: dayData.mood,
        activities,
        mainActivityType,
        color: activityColor(mainActivityType),
      }
    }),
  )

  return days
}
// usage:
// const days = await getCalendarDaysFromToday(user.uid, 14)

function createDateRange(daysBack: number) {
  const result: string[] = []
  const today = new Date()

  for (let i = daysBack - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)
    result.push(toDateId(date))
  }

  return result
}

export async function getCalendarDaysFromTodayNoGaps(
  uid: string,
  daysBack: number,
): Promise<CalendarDay[]> {
  const existingDays = await getCalendarDaysFromToday(uid, 14)
  const dateRange = createDateRange(14)

  const result = dateRange.map((date) => {
    const existing = existingDays.find((day) => day.date === date)

    return (
      existing ?? {
        id: date,
        date,
        activities: [],
        mainActivityType: null,
        color: 'bg-zinc-800',
      }
    )
  })

  return result
}
