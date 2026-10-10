import { useState } from "react"
import type { Application } from "../types/application"
import { useInterviews } from "../hooks/useInterviews"
import InterviewRow from "./InterviewRow"
import InterviewForm from "./InterviewForm"

type Props = {
    item: Application
    onUpdateStatus: (id: string, status: string) => void
    onRemove: (id: string) => void
}

export default function ApplicationRow({ item, onUpdateStatus, onRemove }: Props) {
    const [draft, setDraft] = useState(item.status)
    const { items: interviews, add, remove } = useInterviews(item.id)

    return (
        <li className="rounded border p-3">
            <div className="flex items-center justify-between">
                <div className="font-semibold">{item.company}</div>
                <button
                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                onClick={() => onRemove(item.id)}
                >
                Delete
                </button>
            </div>
            <select
                className="mt-1 rounded border bg-white px-2 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
            >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
            </select>
            {draft !== item.status && (
                <button
                    className="ml-2 rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    onClick={() => onUpdateStatus(item.id, draft)}
                >
                    Save
                </button>
            )}
            {interviews.length > 0 && (
                <div className="mt-3 space-y-2">
                    {interviews.map((interview) => (
                        <InterviewRow key={interview.id} interview={interview} onRemove={remove} />
                    ))}
                </div>
            )}
            <InterviewForm onAdd={add} />
        </li>
    )
}