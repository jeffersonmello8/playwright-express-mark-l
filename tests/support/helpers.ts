import { APIRequestContext, expect } from "@playwright/test";
import { TaskModel } from "../fixtures/task.model";

export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    var resp = await request.delete(`http://localhost:3333/helper/tasks/${taskName}`)
    expect(resp.ok()).toBeTruthy()
}

export async function postTask(request: APIRequestContext, task: TaskModel) {
    var resp = await request.post('http://localhost:3333/tasks/', { data: task })
    expect(resp.ok()).toBeTruthy()
}