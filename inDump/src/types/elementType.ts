type fontObject = {
  link: string;
  fontFamily: string;
};
interface TextElementProps {
  text: string;
  font: fontObject;
  size: number;
}

export type PostCardProps = {
  image: HTMLImageElement;
  scale: number | 0;
};

export type RectElementProps = {
  width: number;
  height: number;
  fill: string;
};

type GridElementProps = {
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  imageSrc: File;
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
    };
