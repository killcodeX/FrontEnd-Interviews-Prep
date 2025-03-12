const testimonial = [
  {
    id: 1,
    name: "Jacob Reed",
    work: "Corporate Attorney",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6784c716eb844945c9030759_reviewer-16.jpg",
    test: "Olivia’s professionalism and deep understanding of luxury properties gave me confidence throughout the process.",
  },
  {
    id: 2,
    name: "Harper Gray",
    work: "FreeLance Writer",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6784cf95c71e1da0073c2240_team-4-p-500.jpg",
    test: "Charlotte’s dedication and efficiency turned my dream of owning a luxury villa into reality. Her service was flawless.",
  },
  {
    id: 3,
    name: "Amelia Cooper",
    work: "Graphic Designer",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6784c7160b1fd1a669fc2501_reviewer-3.jpg",
    test: "Sophia’s passion for sustainable housing helped me find a beautiful and eco-friendly home that I absolutely love.",
  },
  {
    id: 4,
    name: "Henry Ellis",
    work: "Finance Analyst",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6789052eb36498c29a93edf7_reviewer-4.jpg",
    test: "Emma’s dedication and seamless service made renting my property hassle-free. Her expertise is second to none.",
  },
  {
    id: 5,
    name: "Oliver Scott",
    work: "Marketing Strategist",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6789052eb36498c29a93edf5_reviewer-6.jpg",
    test: "Liam helped me secure an excellent deal on a luxury home. His professionalism and negotiation skills were remarkable.",
  },
  {
    id: 6,
    name: "Lily Ross",
    work: "Eco-Lifestyle Blogger",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6789052eb36498c29a93edfb_reviewer-12.jpg",
    test: "Liam helped me secure an excellent deal on a luxury home. His professionalism and negotiation skills were remarkable.",
  },
  {
    id: 7,
    name: "William Parker",
    work: "Business Owner",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6789052db36498c29a93ede9_reviewer-9.jpg",
    test: "Noah’s commitment to finding the perfect property for my business was exceptional. His market insights are unparalleled.",
  },
  {
    id: 8,
    name: "Aria Sullivan",
    work: "Digital Nomad",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6789052eb36498c29a93edf9_reviewer-7.jpg",
    test: "sabella’s attention to detail and friendly approach made renting my property a simple and enjoyable experience.",
  },
  {
    id: 9,
    name: "Samuel Brooks",
    work: "Interior Designer",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6789052db36498c29a93edf3_reviewer-1.jpg",
    test: "sabella’s attention to detail and friendly approach made renting my property a simple and enjoyable experience.",
  },
  {
    id: 10,
    name: "Aurora James",
    work: "Fashion Consultant",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6789052db36498c29a93edeb_reviewer-8.jpg",
    test: "sabella’s attention to detail and friendly approach made renting my property a simple and enjoyable experience.",
  },
  {
    id: 11,
    name: "Sebastian Turner",
    work: "Hospitality Manager",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6789052db36498c29a93eded_reviewer-11.jpg",
    test: "Ethan’s creativity and expertise in short-term rentals gave me the confidence to invest in my first vacation property.",
  },
  {
    id: 12,
    name: "Alexander Hayes",
    work: "Investment Banker",
    pic: "https://cdn.prod.website-files.com/6784794885cc7b8dbfb185e2/6789052eb36498c29a93ee01_reviewer-14.jpg",
    test: "sabella’s attention to detail and friendly approach made renting my property a simple and enjoyable experience.",
  },
];

export const fetchTestimonials = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(testimonial), 300);
  });
};
