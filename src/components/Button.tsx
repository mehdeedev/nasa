interface IButton {
  caption: string;
  onClick: () => void;
}

function Button(props: IButton) {
  const { caption, onClick } = props;

  return (
    <button
      className="border w-full rounded flex-1 p-3 bg-sky-500 text-white"
      onClick={onClick}
    >
      {caption}
    </button>
  );
}

export { Button };
