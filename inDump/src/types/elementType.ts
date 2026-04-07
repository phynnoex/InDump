export type fontObject = {
  link: string;
  fontFamily: string;
};

type ElementTransformProps = {
  scale?: number;
  opacity?: number;
  position?: {
    x: number;
    y: number;
  };
};

export type TextElementProps = {
  text: string;
  font: fontObject;
  color?: string;
  size: number;
} & ElementTransformProps;

export type PostCardProps = {
  image: string;
  scale: number | 0;
  x: number | 0;
  y: number | 0;
  rotation: number | 0;
} & ElementTransformProps;

export type RectElementProps = {
  width: number;
  height: number;
  fill: string;
} & ElementTransformProps;

export type ImageElementProps = {
  width: number;
  height: number;
  imageSrc: string;
} & ElementTransformProps;

export type StickerImageProps = {
  imageSrc: string;
  stroke?: string;
  strokeWidth?: number;
} & ElementTransformProps;

type GridElementProps = {
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  imageSrc: string;
} & ElementTransformProps;

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
    }
  | {
      id: string;
      type: "stickerImage";
      props: StickerImageProps;
    };
