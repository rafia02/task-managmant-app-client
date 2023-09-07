import React from 'react'

export const SingleTask = ({task}) => {
    return (
        <div>
            <div key={task.id} className="mb-4 p-4 border rounded-lg">
                <h2 className="text-xl font-medium">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-gray-500">Due Date: {task.dueDate}</p>
                <p className={`text-${task.priority} font-semibold`}>Priority: {task.priority}</p>
                <button
                    onClick={() => onCompleteTask(task.id)}
                    className={`px-4 py-2 text-white bg-${task.completed ? 'green' : 'blue'
                        }-500 rounded-lg hover:bg-${task.completed ? 'green' : 'blue'
                        }-600 focus:outline-none focus:ring focus:border-${task.completed ? 'green' : 'blue'
                        }-300 mt-2`}
                >
                    {task.completed ? 'Completed' : 'In Progress'}
                </button>
            </div>
        </div>
    )
}
