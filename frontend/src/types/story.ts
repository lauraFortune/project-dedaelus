
export interface Choice {
  _id?: string
  text: string
  targetChapterId: string
  targetSceneId: string
}

export interface Scene {
  _id?: string;
  title: string;
  image?: string;
  description: string;
  prompt?: string;
  choices: Choice[];
}

export interface Chapter {
  _id?: string;
  scenes: Scene[];
}

export interface Story {
  _id: string;
  title: string;
  synopsis: string;
  author: string;
  likes: string[];
  publish: boolean;
  chapters: Chapter[];
  createdAt: string;
  updatedAt: string;
}