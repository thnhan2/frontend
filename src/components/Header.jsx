import { Link } from "react-router-dom";

import PropTypes from "prop-types";

Header.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  linkName: PropTypes.string.isRequired,
  linkUrl: PropTypes.string,
};
export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <span className="text-amber-500 font-noto h-14 w-14 flex items-center justify-center text-2xl bg-gray-200 rounded-full">
        SOA MENU
        </span>
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
