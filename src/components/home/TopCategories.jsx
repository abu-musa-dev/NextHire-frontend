import { ArrowRight, PenLine, Code2, Database, ShoppingBag } from 'lucide-react';

const categories = [
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
    title: 'Customer Service',
  },
];

export default function TopCategories() {
  return (
    <section className="bg-[#f1f6f4] py-16 px-4 text-center">
      <h2 className="text-3xl font-semibold text-gray-800">Top categories</h2>
      <p className="text-gray-500 mt-2 mb-8">
        Easily find the right service from over 2000+ skills
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md flex items-center justify-between"
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
