
export type RegisterRequestBody = {
  username: string;
  email: string;
  password: string;
}

export type LoginRequestBody = {
  email: string;
  password: string;
}

export type UpdateProfileRequestBody = {
  profileImage?: string;
  bio?: string;
}

// Story Update
export type UpdateStoryRequestBody = {
  title?: string;
  synopsis?: string;
  publish?: boolean;
  chapters?: ChapterUpdate[];
}

export type ChapterUpdate = {
  scenes?: SceneUpdate[];
}

export type SceneUpdate = {
  title?: string;
  image?: string;
  description?: string;
  prompt?: string;
  choices?: ChoiceUpdate[];
}

export type ChoiceUpdate = {
  text?: string;
  targetChapter?: number;
  targetScene?: number;
}



