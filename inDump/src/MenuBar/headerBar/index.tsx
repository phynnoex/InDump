import { Cancel01FreeIcons} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss";

type HeaderBarProps = {
    title: string;
    setIsMenuClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderBar({ title, setIsMenuClose }: HeaderBarProps) {
  return (
    <div className="headerBar">
        <div className="headerBar__title">{title}</div>
        <button className="headerBar__closeButton" onClick={() => setIsMenuClose(true)}>
            <HugeiconsIcon
                        icon={Cancel01FreeIcons}
                        size={24}
                        stroke="1.5"
                    />
        </button>
    </div>
  );
}