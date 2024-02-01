import { Category } from "../context/TodosContextProvider";
// const url = "http://todos.siyuliusandbox.com";
// const url="http://3.106.245.135:80"
// const url = "http://localhost:8080";
const url = "https://todos-backend-v1-d34dde2be7d3.herokuapp.com";
export class CategoryService {
  public static async get(): Promise<Category[]> {
    const response = await fetch(`${url}/categories`);
    return await response.json();
  }

  public static async createCategory(data: any): Promise<Category> {
    const response = await fetch(`${url}/categories`, {
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
    const response = await fetch(`${url}/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Could not delete");
    }
  }

  public static async updateCategory(id: number, data: any) {
    const response = await fetch(`${url}/categories/${id}`, {
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