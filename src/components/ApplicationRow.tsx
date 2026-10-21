import { useState } from "react"
import type { Application } from "../types/application"
import { useInterviews } from "../hooks/useInterviews"
import InterviewRow from "./InterviewRow"
import InterviewForm from "./InterviewForm"
import Button from "./ui/Button"
import Textarea from "./ui/Textarea"
import Input from "./ui/Input"
import Select from "./ui/Select"

type Props = {
    item: Application
    onUpdateStatus: (id: string, status: string) => void
    onRemove: (id: string) => void
    onUpdate: (id: string, company: string, description: string | null, status: string) => Promise<string | null>
}

export default function ApplicationRow({ item, onUpdateStatus, onRemove, onUpdate }: Props) {
    const [draft, setDraft] = useState(item.status)
    const { items: interviews, error: interviewError, add, remove, update } = useInterviews(item.id)
    const [isEditing, setIsEditing] = useState(false)
    const [editCompany, setEditCompany] = useState(item.company)
    const [editDescription, setEditDescription] = useState(item.description ?? '')
    const [helloMessage, setHelloMessage] = useState<string | null>(null)

    return (
        <li className="rounded border p-3">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1 flex flex-col gap-1 mr-2">
                     {isEditing ? (
                        <>
                            <Input size="sm"
                                className="font-semibold mb-1"
                                value={editCompany}
                                onChange={(e) => setEditCompany(e.target.value)}
                            />
                            <Textarea
                                size="sm"
                                className="text-sm"
                                placeholder="Description"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <div className="font-semibold">{item.company}</div>
                            {item.description && (
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    {item.description}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button color="green"
                                onClick={async () => {
                                    const message = await onUpdate(item.id, editCompany, editDescription || null, draft)
                                    setHelloMessage(message)
                                    setTimeout(() => setHelloMessage(null), 3000)
                                    setIsEditing(false)
                                }}
                            >Save</Button>
                            <Button color="gray"
                                onClick={() => {
                                    setEditCompany(item.company)
                                    setEditDescription(item.description ?? '')
                                    setIsEditing(false)
                                }}
                            >Cancel</Button>
                        </>
                    ) : (
                        <>
                            <Button color="green" onClick={() => setIsEditing(true)}>Update</Button>
                            <Button color="red" onClick={() => onRemove(item.id)}>Delete</Button>
                        </>
                    )}
                </div>
            </div>
            {helloMessage && (
                <p className="mb-2 text-sm text-green-600">{helloMessage}</p>
            )}            
            <Select
                size="sm"
                className="mt-1 inline-block"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
            >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
            </Select>
            {draft !== item.status && (
                <Button color="green" className="ml-2" onClick={() => onUpdateStatus(item.id, draft)}>
                    Save
                </Button>
            )}
            {interviews.length > 0 && (
                <div className="mt-3 space-y-2">
                    {interviews.map((interview) => (
                        <InterviewRow key={interview.id} interview={interview} onRemove={remove} onUpdate={update} />
                    ))}
                </div>
            )}
            {interviewError && (
                <p className="mt-2 text-sm text-red-600">{interviewError}</p>
            )}
            <InterviewForm onAdd={add} />
        </li>
    )
}