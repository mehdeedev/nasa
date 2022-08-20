import { IconLocation, IconPhotographer } from "../icons";
import { IItem } from "../types";

interface IProps {
  item: IItem;
}

function CardItem(props: IProps) {
  const { item } = props;
  const { location, title, nasa_id, photographer } = item.data[0];
  return (
    <div
      className="flex md:flex-col bg-white shadow-md p-2 rounded"
      key={nasa_id}
    >
      <div className="w-24 h-24 md:w-full md:h-40 flex-shrink-0">
        <img
          className="w-full h-full object-cover rounded"
          src={item.links[0].href}
        />
      </div>
      <div className="mx-4 md:mx-0 text-left flex flex-col w-full">
        <div className="font-bold text-sm flex items-center md:truncate md:block">
          {title}
        </div>
        <div className="text-xs text-gray-500 flex-1 flex flex-col justify-end md:mt-2">
          <div className="flex items-center">
            <div className="w-4 h-4 text-gray-400">
              <IconLocation className="fill-current" />
            </div>
            <div className="ml-1">{location || "Unknown"}</div>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-4 h-4 text-gray-400">
              <IconPhotographer className="fill-current" />
            </div>
            <div className="ml-1">{photographer || "Uknown"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CardItem };
