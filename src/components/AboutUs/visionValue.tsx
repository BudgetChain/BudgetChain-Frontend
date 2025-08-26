import Image from 'next/image';

const visionText =
  'To empower individuals and organizations with cutting-edge solutions that drive growth, foster innovation, and create sustainable impact globally.';

const coreValues = [
  {
    title: 'Integrity',
    description:
      'We uphold the highest standards of honesty and transparency in all our actions.',
    icon: 'svg/Icons.svg',
  },
  {
    title: 'Innovation',
    description:
      'We constantly seek new ideas and embrace change to deliver breakthrough solutions.',
    icon: 'svg/Icons.svg',
  },
  {
    title: 'Excellence',
    description:
      'We strive for quality and professionalism in everything we do.',
    icon: 'svg/Icons.svg',
  },
  {
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and shared success.',
    icon: 'svg/Icons.svg',
  },
];

const VisionAndValues = () => {
  return (
    <section className="text-white flex flex-col items-center justify-center py-6 px-8 md:px-16 ">
      <h3 className="text-3xl font-bold mb-6 text-center">Vision & Values</h3>

      <p className="text-gray-400 max-w-3xl text-center mb-12">{visionText}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full ">
        {coreValues.map((value, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-[#131322] p-6 rounded-xl shadow-md hover:bg-gray-700 transition-colors text-center"
          >
            <Image
              src={value.icon}
              alt={value.title}
              width={48}
              height={48}
              className="w-12 h-12 mb-4"
            />
            <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
            <p className="text-sm text-gray-400">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisionAndValues;
