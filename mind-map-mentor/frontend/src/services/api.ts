import axios from 'axios';
import { useAuthStore } from '@/store/authStore'; // Import Zustand store
import {
  Note, NoteUpdateData, User, ApiFile, BackendGraphNode, BackendGraphEdge,
  SearchResponse, RagQueryRequest, RagQueryResponse
} from '@/types'; // Import Note, NoteUpdateData, User, File types AND AI types

// Determine Backend URL (adjust if your backend runs elsewhere)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Export the server origin (e.g., http://localhost:8000)
export const API_SERVER_ORIGIN = API_BASE_URL.replace('/api/v1', '');

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Axios Request Interceptor --- //
// Add a request interceptor to include the token if available
apiClient.interceptors.request.use(
  (config) => {
    // Get token from Zustand store (outside of React component)
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Add specific log for /users/me
      if (config.url === '/users/me') { 
        console.log(`Axios Interceptor: Attaching token to ${config.url}: Bearer ${token.substring(0, 10)}...`);
      }
    } else {
       if (config.url === '/users/me') { 
        console.log(`Axios Interceptor: No token found for ${config.url}`);
       }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- API Service Functions --- //

// Helper to safely extract error messages
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail || error.message || 'An error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}

// Define LoginResponse
interface LoginResponse {
  access_token: string;
  token_type: string;
}

// Login User
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  // FastAPI's OAuth2PasswordRequestForm expects form data
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  try {
    const response = await apiClient.post<LoginResponse>('/login/access-token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Login API error:', error);
    throw new Error(getErrorMessage(error) || 'Login failed');
  }
};

// Signup User
export const signupUser = async (email: string, password: string, fullName: string): Promise<User> => {
  try {
    const response = await apiClient.post<User>('/users/', { email, password, fullName });
    return response.data;
  } catch (error: unknown) {
    console.error('Signup API error:', error);
    throw new Error(getErrorMessage(error) || 'Signup failed');
  }
};

// Get Current User (Corrected)
export const getCurrentUser = async (): Promise<User | null> => {
  console.log("getCurrentUser: Attempting API call to /users/me"); // Add log
  try {
    const response = await apiClient.get<User>('/users/me');
    console.log("getCurrentUser: API call successful, status:", response.status, "Data:", response.data); // Add log
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `getCurrentUser: Axios error! Status: ${error.response?.status}, ` +
        `Data: ${JSON.stringify(error.response?.data)}, ` +
        `Headers: ${JSON.stringify(error.response?.headers)}`
      );
      if (error.response?.status === 401) {
        console.log('getCurrentUser: Detected 401 Unauthorized. Returning null.');
        return null;
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch user data');
    } else {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('getCurrentUser: Non-Axios error:', message);
      throw new Error(message);
    }
  }
};

// --- Notes API Service Functions --- //

// Define response structure for paginated notes
interface NotesPageResponse {
  items: Note[];
  total: number;
}

// Fetch Notes for current user (paginated with optional search)
export const fetchNotes = async (skip: number = 0, limit: number = 100, search: string = ''): Promise<NotesPageResponse> => {
  try {
    const params: Record<string, number | string> = { skip, limit };
    if (search.trim()) {
      params.search = search.trim();
    }
    const response = await apiClient.get<NotesPageResponse>('/notes/', { params });
    return response.data; // Return the whole object { items: [], total: number }
  } catch (error: unknown) {
    console.error('Fetch Notes API error:', error);
    throw new Error(getErrorMessage(error) || 'Failed to fetch notes');
  }
};

// Create a new Note
interface NoteCreatePayload {
  title: string;
  content?: string | null; // Make content optional/nullable
  userSummary?: string | null; // Add user summary (matches backend)
  position_x?: number;
  position_y?: number;
}

export const createNote = async (noteData: NoteCreatePayload): Promise<Note> => {
  try {
    const response = await apiClient.post<Note>('/notes/', noteData);
    return response.data;
  } catch (error: unknown) {
    console.error('Create Note API error:', error);
    throw new Error(getErrorMessage(error) || 'Failed to create note');
  }
};

// Function to get a single note by ID (Corrected)
export const getNoteById = async (noteId: number): Promise<Note> => {
  try {
    const response = await apiClient.get<Note>(`/notes/${noteId}`); // Removed prefix
    console.log('Get Note By ID API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Note By ID API error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.detail || 'Failed to fetch note');
    }
    throw new Error('Failed to fetch note');
  }
};

// Function to update a note by ID (Corrected)
export const updateNote = async (noteId: number, noteData: NoteUpdateData): Promise<Note> => {
  try {
    const response = await apiClient.put<Note>(`/notes/${noteId}`, noteData); // Removed prefix
    console.log('Update Note API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update Note API error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.detail || 'Failed to update note');
    }
    throw new Error('Failed to update note');
  }
};

// Function specifically for updating position (uses the general updateNote)
// This is more of a convenience wrapper for the drag handler use case
export const updateNotePosition = async (noteId: number, position: { x: number; y: number }): Promise<Note> => {
    console.log(`Updating position for note ${noteId}:`, position);
    const updateData: NoteUpdateData = {
        position_x: position.x,
        position_y: position.y,
    };
    // Reuse the existing updateNote function
    return updateNote(noteId, updateData);
};

// Function to delete a note by ID (Corrected)
export const deleteNote = async (noteId: number): Promise<void> => {
  try {
    const response = await apiClient.delete(`/notes/${noteId}`); // Removed prefix
    console.log('Delete Note API response status:', response.status);
  } catch (error) {
    console.error('Delete Note API error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.detail || 'Failed to delete note');
    }
    throw new Error('Failed to delete note');
  }
};

// --- Graph API Service Functions (Combined) --- //

// Define the payload for creating an edge (matches backend GraphEdgeCreate schema)
interface GraphEdgeCreatePayload {
    source_node_id: number;
    target_node_id: number;
    relationship_type?: string | null;
    data?: Record<string, unknown> | null;
}

// Define the payload for updating an edge (matches backend GraphEdgeUpdate schema)
// Task 3: Add this type
interface GraphEdgeUpdatePayload {
    source_node_id?: number | null; // Usually not updated, but included for completeness
    target_node_id?: number | null; // Usually not updated
    relationship_type?: string | null;
    data?: Record<string, unknown> | null;
}

// Fetch ALL Graph Nodes (Notes, Files, etc.)
export const fetchGraphNodes = async (skip: number = 0, limit: number = 1000): Promise<BackendGraphNode[]> => {
    try {
        const response = await apiClient.get<BackendGraphNode[]>('/graph/nodes/', {
            params: { skip, limit },
        });
        console.log('Fetched ALL Graph Nodes:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Fetch ALL Graph Nodes API error:', error);
        throw new Error(getErrorMessage(error) || 'Failed to fetch all graph nodes');
    }
};

// Fetch Graph Edges for current user
export const fetchGraphEdges = async (skip: number = 0, limit: number = 1000): Promise<BackendGraphEdge[]> => {
    try {
        const response = await apiClient.get<BackendGraphEdge[]>('/graph/edges/', {
            params: { skip, limit },
        });
        console.log('Fetched Graph Edges:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Fetch Graph Edges API error:', error);
        throw new Error(getErrorMessage(error) || 'Failed to fetch graph edges');
    }
};

// Create a new Graph Edge
export const createGraphEdge = async (edgeData: GraphEdgeCreatePayload): Promise<BackendGraphEdge> => {
    try {
        const response = await apiClient.post<BackendGraphEdge>('/graph/edges/', edgeData);
        console.log('Created Graph Edge:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Create Graph Edge API error:', error);
        throw new Error(getErrorMessage(error) || 'Failed to create graph edge');
    }
};

// Delete a Graph Edge (Verified in Task 1)
export const deleteGraphEdge = async (edgeId: number): Promise<void> => {
  try {
    const response = await apiClient.delete(`/graph/edges/${edgeId}`);
    console.log('Delete Graph Edge API response status:', response.status);
  } catch (error: unknown) {
    console.error('Delete Graph Edge API error:', error);
    throw new Error(getErrorMessage(error) || 'Failed to delete graph edge');
  }
};

// Task 3: Add updateGraphEdge function
// Update a Graph Edge
export const updateGraphEdge = async (edgeId: number, edgeData: GraphEdgeUpdatePayload): Promise<BackendGraphEdge> => {
    try {
        const response = await apiClient.put<BackendGraphEdge>(`/graph/edges/${edgeId}`, edgeData);
        console.log('Updated Graph Edge:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Update Graph Edge API error:', error);
        throw new Error(getErrorMessage(error) || 'Failed to update graph edge');
    }
};

// --- File API Service Functions --- //

// Define response structure for paginated files
interface FilesPageResponse {
  items: ApiFile[];
  total: number;
}

// Function to fetch files for the current user (paginated)
export const fetchFiles = async (skip: number = 0, limit: number = 100): Promise<FilesPageResponse> => {
    try {
        const response = await apiClient.get<FilesPageResponse>('/files/', {
            params: { skip, limit },
        });
        return response.data; // Return the whole object { items: [], total: number }
    } catch (error: unknown) {
        console.error('Fetch Files API error:', error);
        throw new Error(getErrorMessage(error) || 'Failed to fetch files');
    }
};

// Function to upload a file
export const uploadFile = async (file: File): Promise<ApiFile> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        // The interceptor adds the auth token
        // Content-Type header is set automatically by browser for FormData
        const response = await apiClient.post<ApiFile>('/files/upload', formData, {
            headers: {
                // Let browser set Content-Type for multipart/form-data
                 'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Uploaded File Response:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Upload File API error:', error);
        throw new Error(getErrorMessage(error) || 'Failed to upload file');
    }
};

// Function to get a specific file's metadata
export const getFileMetadata = async (fileId: number): Promise<ApiFile> => {
    try {
        const response = await apiClient.get<ApiFile>(`/files/${fileId}`);
        console.log('Get File Metadata API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Get File Metadata API error:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail || 'Failed to fetch file metadata');
        }
        throw new Error('Failed to fetch file metadata');
    }
};

// Function to delete a file
export const deleteFile = async (fileId: number): Promise<void> => {
    try {
        const response = await apiClient.delete(`/files/${fileId}`);
        console.log('Delete File API response status:', response.status);
    } catch (error: unknown) {
        console.error('Delete File API error:', error);
        throw new Error(getErrorMessage(error) || 'Failed to delete file');
    }
};

// Function to download a file
export const downloadFileApi = async (fileId: number): Promise<Blob> => {
    try {
        // The interceptor adds the auth token
        const response = await apiClient.get(`/files/${fileId}/download`, {
            responseType: 'blob', // Important: Expect binary data (file blob)
        });
        console.log('Download File API response status:', response.status, 'Type:', response.data.type);
        return response.data; // Return the Blob object
    } catch (error: unknown) {
        console.error('Download File API error:', error);
        let detail = getErrorMessage(error) || 'Failed to download file';
        if (axios.isAxiosError(error) && error.response?.data instanceof Blob && error.response.data.type === 'application/json') {
            try {
                const errorJson = JSON.parse(await error.response.data.text());
                detail = errorJson.detail || detail;
            } catch (parseError) {
                console.error('Could not parse error blob:', parseError);
            }
        }
        throw new Error(detail);
    }
};

// Function to update the position of a file node
export const updateFilePosition = async (fileId: number, position: { x: number; y: number }): Promise<BackendGraphNode> => {
    console.log(`API: Updating position for file ${fileId}:`, position);
    const updateData = {
        position_x: position.x,
        position_y: position.y,
    };
    try {
        // Backend endpoint returns the updated GraphNode
        const response = await apiClient.put<BackendGraphNode>(`/files/${fileId}/position`, updateData); // Expect BackendGraphNode response
        console.log('Update File Position API response:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Update File Position API error:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail || 'Failed to update file position');
        }
        throw new Error('Failed to update file position');
    }
};

// Note: Downloading files is usually handled via a simple link (<a href="/api/v1/files/{file_id}/download">)
// rather than an explicit API call in JavaScript, as the browser handles the download.

// --- AI Service Functions --- //

export const searchNotesApi = async (
  query: string,
  top_k: number = 5
): Promise<SearchResponse> => {
  try {
    console.log(`API: Searching notes with query: "${query}", top_k: ${top_k}`);
    const response = await apiClient.get<SearchResponse>('/ai/search-notes', {
      params: { query, top_k },
    });
    console.log('API: Search response received:', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('Search Notes API error:', error);
    throw new Error(getErrorMessage(error) || 'Failed to search notes');
  }
};

// New RAG Query Function
export const ragQueryApi = async (query: string): Promise<RagQueryResponse> => {
  const requestData: RagQueryRequest = { query };
  try {
    const response = await apiClient.post<RagQueryResponse>('/ai/rag-query', requestData);
    return response.data;
  } catch (error: unknown) {
    console.error('RAG Query API error:', error);
    throw new Error(getErrorMessage(error) || 'Failed to get AI answer');
  }
};

// --- User Password Management --- //

interface ChangePasswordResponse {
  message: string;
}

export const changePassword = async (currentPassword: string, newPassword: string): Promise<ChangePasswordResponse> => {
  try {
    const response = await apiClient.patch<ChangePasswordResponse>('/users/me/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Change Password API error:', error);
    throw new Error(getErrorMessage(error) || 'Failed to change password');
  }
};

export default apiClient; // Export the configured instance if needed elsewhere 