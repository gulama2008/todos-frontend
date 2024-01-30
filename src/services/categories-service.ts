import { Category } from "../context/TodosContextProvider";

export class CategoryService {
  public static async get(): Promise<Category[]> {
    const response = await fetch("http://localhost:8080/categories");
    return await response.json();
  }

  public static async createCategory(data: any): Promise<Category> {
    const response = await fetch("http://localhost:8080/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Could not create category");
    }
    return response.json();
  }

  public static async deleteCategory(id: number) {
    const response = await fetch(`http://localhost:8080/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Could not delete");
    }
  }

  public static async updateCategory(id: number, data: any) {
    const response = await fetch(`http://localhost:8080/categories/${id}`, {
      method: "PUT",
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