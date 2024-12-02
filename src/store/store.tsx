import { create } from "zustand";
import { persist } from "zustand/middleware";

const priorityLevels = ["Extreme", "Moderate", "Low"];
const statusLevels = ["Pending", "In Progress", "Completed"];

interface User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

interface Task {
  title: string;
  description: string;
  deadline: string;
  subtitle: string;
  objective: string;
  category: Category;
}

interface Category {
  priority: {
    type: string;
    enum: typeof priorityLevels;
  };
  status: {
    type: string;
    enum: typeof statusLevels;
  };
  additionalFields: {
    type: string;
  };
}

interface IStore {
  user: User | null;
  tasks: Task[];
  categories: Category[];
  setTasks: (tasks: Task[]) => void;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  currentTask: Task | null;
  setCurrentTask: (task: Task | null) => void;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated?: boolean;
}

export const useStore = create<IStore>()(
  persist(
    (set) => ({
      user: {
        firstname: "John",
        lastname: "Doe",
        username: "johndoe",
        email: "",
      },
      tasks: [],
      categories: [
        {
          priority: {
            type: "string",
            enum: priorityLevels,
          },
          status: {
            type: "string",
            enum: statusLevels,
          },
          additionalFields: {
            type: "string",
          },
        },
      ],
      openDialog: false,
      login: (user: User) => set({ user: user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setOpenDialog: (open: boolean) => set({ openDialog: open }),
      currentTask: null,
      setCurrentTask: (task: Task | null) => set({ currentTask: task }),
      setTasks: (tasks: Task[]) => set({ tasks: tasks }),
    }),
    {
      name: "taskify-store",
    }
  )
);
