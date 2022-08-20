import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Keyword } from "../components";
import { IconDate, IconPhotographer, IconTag } from "../icons";
import { IItem, IResponse } from "../types";
import { fetchAPI, generateUrl } from "../utils/api";
import { convertDate } from "../utils/stringUtils";
import { useNavigate, useLocation } from "react-router-dom";

function Show() {
  const { nasaId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState<IItem | null>(null);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  useEffect(() => {
    const url = generateUrl({ nasa_id: nasaId });
    fetchAPI<IResponse>(url)
      .then((response) => {
        const { data } = response;
        setItem(data.collection.items[0]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const renderItem = () => {
    if (!item) {
      return "";
    }
    const { title, description, keywords, date_created, photographer } =
      item?.data[0];
    return (
      <div className="p-3">
        <div>
          <div className="rounded overflow-hidden">
            <img src={item?.links[0].href} className="md:w-full" />
          </div>
        </div>
        <div className="text-left mt-2">
          <h2 className="font-bold text-lg">{title}</h2>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          <div className="flex flex-col gap-2 mt-4">
            {photographer ? (
              <div className="flex text-gray-500 items-center text-sm ml-1">
                <div className="w-6 h-6">
                  <IconPhotographer className="fill-current" />
                </div>
                <div className="ml-2">{photographer}</div>
              </div>
            ) : (
              ""
            )}
            <div className="flex ml-1.5">
              <div className="w-5 h-5 relative top-1 text-gray-500 flex-shrink-0">
                <IconTag className="fill-current" />
              </div>
              <div className="flex gap-2 ml-2 flex-wrap">
                {keywords.map((keyword) => (
                  <Keyword caption={keyword} key={keyword} />
                ))}
              </div>
            </div>
            <div className="flex text-gray-500 items-center text-sm">
              <div className="w-8 h-8">
                <IconDate className="fill-current" />
              </div>
              <div className="ml-1">{convertDate(date_created)}</div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Button
            caption="Back"
            onClick={() => navigate(`/${currentLocation.search}`)}
          />
        </div>
      </div>
    );
  };
  return <div>{isLoading ? "" : renderItem()}</div>;
}

export { Show };
