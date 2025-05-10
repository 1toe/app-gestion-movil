export interface Provider {
  provider_id?: number;
  provider_name: string;
  provider_last_name: string;
  provider_mail: string;
  provider_state?: string;
}

export class ProvidersService {
  private baseUrl = "http://143.198.118.203:8100";
  private user = "test";
  private pass = "test2023";

  private getHeaders(): Headers {
    const headers = new Headers();
    const authData = btoa(`${this.user}:${this.pass}`);
    headers.append('Authorization', `Basic ${authData}`);
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  async getAll(): Promise<Provider[]> {
    try {
      const response = await fetch(`${this.baseUrl}/ejemplos/provider_list_rest/`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching providers:", error);
      throw error;
    }
  }

  async add(provider: Provider): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/ejemplos/provider_add_rest/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(provider)
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error adding provider:", error);
      throw error;
    }
  }

  async update(provider: Provider): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/ejemplos/provider_edit_rest/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(provider)
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error updating provider:", error);
      throw error;
    }
  }

  async delete(providerId: number): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/ejemplos/provider_del_rest/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ provider_id: providerId })
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error deleting provider:", error);
      throw error;
    }
  }
}
