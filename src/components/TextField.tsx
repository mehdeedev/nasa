import { useField } from "formik";

interface IProps {
  name: string;
  placeholder: string;
  type?: "number" | "text";
  children?: React.ReactNode;
}
function TextField(props: IProps) {
  const { children, ...rest } = props;
  const [field, meta] = useField(rest);
  return (
    <div>
      <div className="w-full flex-wrap border rounded-md flex overflow-hidden relative bg-white">
        <input
          className="flex-1 p-3 border-none w-full focus:outline-none flex flex-wrap flex-start"
          {...field}
          {...rest}
        />
        {children}
      </div>
      {meta.error && meta.touched && (
        <div className="w-full text-xs text-red-600 text-left ml-2">
          {meta.error}
        </div>
      )}
    </div>
  );
}

export { TextField };
