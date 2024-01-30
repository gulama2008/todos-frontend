import { Todo } from "../context/TodosContextProvider";
export interface NewTodoParams {
  content: string;
  categoryId: number | null;
}
export class TodoService {
  public static async get(): Promise<any[]> {
    const response = await fetch("http://localhost:8080/todos");
    return await response.json();
  }

  public static async getById(id: number): Promise<Todo> {
    const response = await fetch(`http://localhost:8080/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Could not find todo with id ${id}`);
    }
    return await response.json();
  }

  public static async createTodo(data: NewTodoParams): Promise<Todo> {
    const response = await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Could not create todo");
    }
    return response.json();
  }

  public static async deleteTodo(id: number) {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Could not delete");
    }
  }

  public static async updateTodo(id: number, data: any) {
    console.log("test");

    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Could not update");
    }
  }
}
