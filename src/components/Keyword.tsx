interface IProps {
  caption: string;
}

function Keyword(props: IProps) {
  const { caption } = props;
  return (
    <div className="border rounded-md text-sm text-gray-500 px-1.5 py-0.5">
      {caption}
    </div>
  );
}

export { Keyword };
