import { useState } from "react";
import plusIcon from "../assets/image/ic_plus.svg";
import deleteIcon from "../assets/image/ic_delete.svg";
import InputField from "../components/InputField";
import TagInput from "../components/TagInput";

export default function Additems() {
  const [inputFields, setInputFields] = useState({
    inputName: "",
    inputDescription: "",
    inputPrice: "",
    inputTag: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputFields((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && !imagePreview) {
      setImagePreview(URL.createObjectURL(file));
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputFields.inputTag.trim()) {
      setTags([...tags, `#${inputFields.inputTag}`]);
      setInputFields((prev) => ({ ...prev, inputTag: "" }));
      // console.log()
    }
  };

  const handleDelete = (indexToDelte) => {
    setTags(tags.filter((_, index) => index !== indexToDelte));
  };

  const isFormValid = !(
    inputFields.inputName &&
    inputFields.inputDescription &&
    inputFields.inputPrice &&
    tags.length > 0
  );

  return (
    <div className="page-size text-gray-800 flex flex-col gap-6 Mobile:px-[14px] Tablet:px-6 mt-6 Tablet:mt-[16px] mb-[70px] Tablet:mb-[78px] PC:mb-[59px] text-2lg">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">상품 등록하기</h3>
        <button
          disabled={isFormValid}
          className={`${
            isFormValid ? "bg-gray400" : "bg-primary100"
          }  text-lg font-semibold w-[74px] h-[42px] rounded-lg text-white`}
        >
          등록
        </button>
      </div>

      <div className="flex flex-col">
        <label htmlFor="productImg" className="text-2lg font-bold">
          상품 이미지
        </label>
        <input
          id="productImg"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          placeholder="이미지 등록"
        />
        <div className="flex gap-[10px] PC:gap-6">
          <label
            htmlFor="productImg"
            className="input-style w-[calc((100%-10px)/2)] Tablet:w-[168px] PC:w-[282px] aspect-[1/1] flex flex-col gap-3 text-lg text-gray-400 items-center justify-center"
          >
            <img
              src={plusIcon}
              alt="이미지 등록 아이콘"
              className="w-12 h-12"
            />
            이미지 등록
          </label>
          <div className="w-[calc((100%-10px)/2)] Tablet:w-[168px] PC:w-[282px] relative">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="등록한 이미지"
                className="w-full aspect-[1/1] rounded-xl mt-[16px] object-cover "
              />
            )}
            {imagePreview && (
              <img
                src={deleteIcon}
                alt="삭제 아이콘"
                onClick={() => {
                  setImagePreview(null);
                  setError(false);
                }}
                className="rounded-full bg-gray-400 p-[5px] inline-block ml-2 absolute right-3 top-7"
              />
            )}
          </div>
        </div>
        {error && (
          <p className="text-lg text-error mt-4">
            *이미지 등록은 최대 1개까지 가능합니다.
          </p>
        )}
      </div>

      <InputField
        label="상품명"
        id="inputName"
        value={inputFields.inputName}
        onChange={handleInputChange}
        placeholder="상품명을 입력해주세요"
      />

      <InputField
        label="상품 소개"
        id="inputDescription"
        value={inputFields.inputDescription}
        onChange={handleInputChange}
        placeholder="상품 소개를 입력해주세요"
        isTextArea
      />

      <InputField
        label="판매가격"
        id="inputPrice"
        value={
          inputFields.inputPrice !== ""
            ? inputFields.inputPrice.toLocaleString()
            : ""
        }
        onChange={(e) => {
          const rawValue = e.target.value.replaceAll(",", ""); // 콤마 제거
          if (!isNaN(rawValue) || rawValue === "") {
            // 숫자인 경우만 업데이트
            setInputFields({
              ...inputFields,
              inputPrice: rawValue === "" ? "" : Number(rawValue),
            });
          }
        }}
        placeholder="판매가격을 입력해주세요"
      />

      <TagInput
        inputTag={inputFields.inputTag}
        setInputTag={(value) =>
          setInputFields((prev) => ({ ...prev, inputTag: value }))
        }
        handleKeyDown={handleKeyDown}
      />
      <div className="flex gap-3 flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray100 rounded-[26px] inline-block py-[5px] pl-4 pr-3"
          >
            {tag}
            <img
              src={deleteIcon}
              alt="삭제 아이콘"
              onClick={() => handleDelete(index)}
              className="rounded-full bg-gray-400 p-[5px] inline-block ml-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
