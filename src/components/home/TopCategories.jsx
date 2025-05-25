import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, PenLine, Code2, Database, ShoppingBag } from 'lucide-react';
import CustomSpinner from "../shared/CustomSpinner"; // Import your spinner

const rawCategories = [
  {
    icon: <Database className="text-green-600" size={24} />,
    title: 'Customer Service',
  },
  {
    icon: <PenLine className="text-green-600" size={24} />,
    title: 'Designer',
  },
  {
    icon: <Code2 className="text-green-600" size={24} />,
    title: 'Developer',
  },
  {
    icon: <ShoppingBag className="text-green-600" size={24} />,
    title: 'Product Manager',
  },
  {
    icon: <PenLine className="text-green-600" size={24} />,
    title: 'Writing & Translation',
  },
  {
    icon: <Database className="text-green-600" size={24} />,
    title: 'Marketing & Sales',
  },
];

const categories = Array.from(new Map(rawCategories.map(item => [item.title, item])).values());

export default function TopCategories() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = (category) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/services?category=${encodeURIComponent(category)}`);
    }, 2000);
  };

  return (
    <section className="bg-[#f1f6f4] py-16 px-4 text-center relative min-h-[400px]">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <CustomSpinner />
        </div>
      )}

      <h2 className="text-3xl font-semibold text-gray-800">Top categories</h2>
      <p className="text-gray-500 mt-2 mb-8">
        Easily find the right service from over 2000+ skills
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md flex items-center justify-between cursor-pointer"
            onClick={() => handleCategoryClick(cat.title)}
          >
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 rounded-full p-2">
                {cat.icon}
              </div>
              <span className="text-gray-800 font-medium">{cat.title}</span>
            </div>
            <ArrowRight className="text-gray-400" />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <a href="#" className="text-green-700 underline text-sm font-medium">
          View all categories
        </a>
      </div>
    </section>
  );
}
