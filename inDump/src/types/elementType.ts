export type fontObject = {
  link: string;
  fontFamily: string;
  
};
export type TextElementProps = {
  text: string;
  font: fontObject;
  color?: string;
  size: number;
  opacity?: number;
}

export type PostCardProps = {
  image: File;
  scale: number | 0;
  x: number | 0;
  y: number | 0;
  rotation: number | 0;
  opacity?: number;
};

export type RectElementProps = {
  width: number;
  height: number;
  fill: string;
  opacity?: number;
};

export type ImageElementProps = {
  width: number;
  height: number;
  imageSrc: File;
  opacity?: number;
};

type GridElementProps = {
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  imageSrc: File;
  opacity?: number;
};

export type ElementsNode =
  | {
      id: string;
      type: "text";
      props: TextElementProps;
    }
  | {
      id: string;
      type: "postCard";
      props: PostCardProps;
    }
  | {
      id: string;
      type: "gridElement";
      props: GridElementProps;
    }
  | {
      id: string;
      type: "rectangle";
      props: RectElementProps;
    }
  | {
      id: string;
      type: "image";
      props: ImageElementProps;
    };
