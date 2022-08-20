import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, CardItem, SearchBox } from "../components";
import { IItem, ILink, IResponse } from "../types";
import {
  BASE_URL,
  convertObjectToSearchParams,
  fetchAPI,
  generateUrl,
} from "../utils/api";

function List() {
  const [list, setList] = useState<IItem[]>([]);
  const [links, setLinks] = useState<ILink[]>([]);
  const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function onSearch(url: string) {
    setList([]);
    setLinks([]);
    setIsLoading(true);
    setNoData(false);

    fetchAPI<IResponse>(url)
      .then((response) => {
        const { data } = response;
        if (data.collection.items.length) {
          setList(data.collection.items);
          setLinks(data.collection.links || []);
        } else {
          setNoData(true);
        }
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (location.search) {
      onSearch(`${BASE_URL}${location.search}`);
    }
  }, [location]);

  return (
    <div className="">
      <div className="p-3">
        <SearchBox
          onSearch={({ query, yearStart, yearEnd }) => {
            navigate(
              "/?" +
                convertObjectToSearchParams({
                  q: query,
                  media_type: "image",
                  year_start: yearStart,
                  year_end: yearEnd,
                })
            );
          }}
        />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          list.map((item) => {
            const { nasa_id } = item.data[0];

            return (
              <Link to={`/show/${nasa_id}${location.search}`} key={nasa_id}>
                <CardItem item={item} key={nasa_id} />
              </Link>
            );
          })
        )}
        {noData ? <div>Unfortunately, no results were found :(</div> : ""}
      </div>
      <div className="flex w-full gap-4 box-border p-4">
        {links.map((link) => (
          <Button
            key={link.prompt}
            caption={link.prompt}
            onClick={() => onSearch(link.href)}
          />
        ))}
      </div>
    </div>
  );
}

export { List };
