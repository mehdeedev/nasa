import { Formik } from "formik";
import { IconSearch } from "../icons";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { Button } from "./Button";

const SearchBoxValidationSchema = Yup.object().shape({
  query: Yup.string().required("query is required!"),
  yearStart: Yup.number()
    .min(1900, "Year start must be greater than 1900!")
    .max(2022, "Year start must be less than 2022!")
    .integer("Year start must be year format!")
    .typeError("Year start must be a number!")
    .positive("Year start must be year format!"),
  yearEnd: Yup.number()
    .min(1900, "Year end must be greater than 1900!")
    .max(2022, "Year end must be less than 2022!")
    .integer("Year end must be year format!")
    .typeError("Year end must be a number!")
    .positive("Year end must be year format!"),
});

interface IParams {
  query: string;
  yearStart: string;
  yearEnd: string;
}

interface IProps {
  onSearch: (params: IParams) => void;
}

function SearchBox(props: IProps) {
  const { onSearch } = props;

  return (
    <Formik
      initialValues={{ query: "", yearStart: "", yearEnd: "" }}
      validationSchema={SearchBoxValidationSchema}
      onSubmit={(values) => {
        onSearch({
          query: values.query,
          yearStart: values.yearStart,
          yearEnd: values.yearEnd,
        });
      }}
    >
      {({ values, handleSubmit, isValid }) => (
        <form className="flex gap-2 flex-wrap" onSubmit={handleSubmit}>
          <div className="w-full md:w-1/2">
            <TextField name="query" placeholder="Write something...">
              <>
                <div
                  className={[
                    "w-6 h-6 absolute right-3 top-0 bottom-0 m-auto transition-right md:hidden",
                    values.query !== "" ? "-right-10" : "",
                  ].join(" ")}
                >
                  <IconSearch className="fill-current text-gray-400" />
                </div>
                <button
                  className={[
                    "flex items-center rounded-md my-1.5 px-3 text-sm box-border translate-x-full transition md:hidden",
                    values.query !== "" ? "-translate-x-1.5" : "",
                    isValid
                      ? "bg-sky-600 text-white"
                      : "bg-gray-200 text-gray-600",
                  ].join(" ")}
                  disabled={!isValid}
                >
                  Search
                </button>
              </>
            </TextField>
          </div>

          <div className="w-full md:flex-1 flex gap-2 mt-2 md:mt-0">
            <div className="flex-1">
              <TextField
                type="number"
                name="yearStart"
                placeholder="Year Start (YYYY)"
              />
            </div>
            <div className="flex-1">
              <TextField
                type="number"
                name="yearEnd"
                placeholder="Year End (YYYY)"
              />
            </div>
            <div className="flex-1 hidden md:block">
              <Button caption="Search" onClick={handleSubmit} />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export { SearchBox };
