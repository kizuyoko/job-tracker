import { useState } from "react"
import type { Application } from "../types/application"
import { useInterviews } from "../hooks/useInterviews"
import InterviewRow from "./InterviewRow"
import InterviewForm from "./InterviewForm"

type Props = {
    item: Application
    onUpdateStatus: (id: string, status: string) => void
    onRemove: (id: string) => void
    onUpdate: (id: string, company: string, description: string | null, status: string) => void
}

export default function ApplicationRow({ item, onUpdateStatus, onRemove, onUpdate }: Props) {
    const [draft, setDraft] = useState(item.status)
    const { items: interviews, add, remove } = useInterviews(item.id)
    const [isEditing, setIsEditing] = useState(false)
    const [editCompany, setEditCompany] = useState(item.company)
    const [editDescription, setEditDescription] = useState(item.description ?? '')

    return (
        <li className="rounded border p-3">
            <div className="flex items-start justify-between">
                <div className="flex-1 flex flex-col gap-1 mr-2">
                    {isEditing ? (
                        <input
                            className="rounded border px-2 py-1 font-semibold"
                            value={editCompany}
                            onChange={(e) => setEditCompany(e.target.value)}
                        />
                    ) : (
                        <div className="font-semibold">{item.company}</div>
                    )}
                    {isEditing && (
                        <textarea
                            className="mt-2 w-full rounded border px-2 py-1 text-sm"
                            placeholder="Description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />
                    )}
                </div>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                                onClick={() => {
                                    onUpdate(item.id, editCompany, editDescription || null, draft)
                                    setIsEditing(false)
                                }}
                            >
                                Save
                            </button>
                            <button
                                className="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
                                onClick={() => {
                                    setEditCompany(item.company)
                                    setEditDescription(item.description ?? '')
                                    setIsEditing(false)
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                                onClick={() => setIsEditing(true)}
                            >
                                Update
                            </button>
                            <button
                                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                onClick={() => onRemove(item.id)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
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