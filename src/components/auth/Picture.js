import { useRef, useState } from "react";

const Picture = ({ readablePicture, onPictureChange }) => {
  const [error, setError] = useState("");
  const inputRef = useRef();

  const handlePicture = (event) => {
    let picture = event.target.files[0];

    if (
      picture.type !== "image/png" &&
      picture.type !== "image/jpeg" &&
      picture.type !== "image/webp"
    ) {
      setError(`${picture?.type} format is supported.`);
      return;
    } else if (picture.size > 1024 * 1024 * 5) {
      setError(`${picture?.type} is too large, maximum 5MB allowed.`);
      return;
    } else {
      setError("");
      // reding the picture
      const reader = new FileReader();
      reader.readAsDataURL(picture);
      reader.onload = (event) => {
        onPictureChange(picture, event.target.result);
      };
    }
  };

  const handleRemovePicture = () => {
    onPictureChange("", "");
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture(Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="picture"
            className="w-20 h-20 object-cover rounded-full"
          />
          {/* Change piscure */}
          <div
            className="mt-2 py-1 w-20  dark:bg-dark_bg_3 rounded-md text-sm  flex items-center justify-center cursor-pointer"
            onClick={handleRemovePicture}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef?.current.click()}
        >
          Upload picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        hidden
        id="picture"
        accept="image/png,image/jpeg,image/webp"
        ref={inputRef}
        onChange={handlePicture}
      />
      {/* error */}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
};

export default Picture;
