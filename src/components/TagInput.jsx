const TagInput = ({ inputTag, setInputTag, handleKeyDown }) => {
  return (
    <div>
      <label htmlFor="productTag" className="text-2lg font-bold">
        태그
      </label>
      <input
        id="productTag"
        type="text"
        value={inputTag}
        onChange={(e) => setInputTag(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input-style"
        placeholder="태그를 입력해주세요"
      />
    </div>
  );
};

export default TagInput;
