import { Camera } from "lucide-react";

const ProfileUpload = ({
  image,
  onChange,
  size = "w-16 h-16",
  showStatus = true,
}) => {
  return (
    <div className="relative group cursor-pointer">
      {/* Clickable Label */}
      <label
        htmlFor="profile-upload"
        className={`${size} rounded-2xl bg-white/50 flex items-center justify-center text-3xl shadow-md ring-2 ring-white/50 overflow-hidden`}
      >
        {image ? (
          <img
            src={image}
            alt="avatar"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <Camera size={32} className="animate-pulse" />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
          Change
        </div>
      </label>

      {/* Hidden Input */}
      <input
        type="file"
        id="profile-upload"
        className="hidden"
        accept="image/*"
        onChange={onChange}
      />

      {/* Online Status */}
      {showStatus && (
        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-[3px] border-white rounded-full animate-pulse"></span>
      )}
    </div>
  );
};

export default ProfileUpload;
