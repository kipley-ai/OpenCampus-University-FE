interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  return (
    <>
      <h1 className="mt-12 text-center text-3xl font-bold">
        What's your course title?
      </h1>
      <h2 className="mt-8 text-center">
        It's ok if you can't think of a good title now. You can change it later.
      </h2>
      <input
        className="input-text mt-12 w-full font-normal sm:w-7/12"
        type="text"
        placeholder="e.g. Learn Java from Scratch"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};
