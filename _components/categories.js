function Categories() {
  const ProductsCategories = {
    HardLuggage: {
      name: "HardLuggage",
      Description:
        "Durable, protective, lightweight, scratch-resistant, waterproof, secure, stylish, rigid, travel-friendly.",
      ImageUrl: [
        "https://th.bing.com/th/id/OIP.amkqTWwwlvYBwFwVPkoPFgHaEl?w=298&h=184&c=7&r=0&o=5&dpr=1.6&pid=1.7",
        "https://skybags.co.in/cdn/shop/files/Adventure_2770a480-66b7-4eff-aa4f-cffc05f20477_2048x.png?v=1710741918",
        "https://www.sunrisetrading.in/wp-content/uploads/Safari-Luggage-Hard-Amaze-Blue-2.jpg",
      ],
    },
    SoftLuggage: {
      name: "SoftLuggage",
      Description:
        "Lightweight, flexible, expandable, durable, soft, portable, accessible, affordable, versatile, travel-friendly.",
      ImageUrl: [
        "https://th.bing.com/th/id/OIP.edGyHrKvshtEVtrND_fjnwHaEl?w=349&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7",
        "https://skybags.co.in/cdn/shop/files/Student_Travel_1_2048x.png?v=1695297287",
      ],
    },
    CabinLuggage: {
      name: "CabinLuggage",
      Description:
        "Compact, portable, lightweight, travel-friendly, carry-on, convenient, organized, wheeled, secure, durable.",
      ImageUrl: [
        "https://th.bing.com/th/id/OIP.igV90HqTcFGgV7ymclRHKwHaEl?w=301&h=186&c=7&r=0&o=5&dpr=1.6&pid=1.7",
        "https://th.bing.com/th/id/OIP.wiE-DHs6TN_5KzHwhlZJ8wHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
    CheckinLuggage: {
      name: "CheckinLuggage",
      Description:
        "Spacious, durable, secure, heavy, wheeled, reinforced, travel-friendly, checked, large, protective.",
      ImageUrl: [
        "https://th.bing.com/th/id/OIP.amkqTWwwlvYBwFwVPkoPFgHaEl?w=298&h=184&c=7&r=0&o=5&dpr=1.6&pid=1.7",
        "https://th.bing.com/th/id/OIP.edGyHrKvshtEVtrND_fjnwHaEl?w=349&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
    MediumLuggage: {
      name: "MediumLugga",
      Description:
        "Medium luggage balances size and capacity, ideal for short to mid-length trips. It offers durability, portability, and organized storage, often featuring wheels and locks.",
      ImageUrl: [
        "https://th.bing.com/th/id/OIP.amkqTWwwlvYBwFwVPkoPFgHaEl?w=298&h=184&c=7&r=0&o=5&dpr=1.6&pid=1.7",
        "https://th.bing.com/th/id/OIP.KJ3UvJvvaz1x0N90ki2yxAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
    ThreeSetLuggage: {
      name: "ThreeSetLuggage",
      Description:
        "Medium luggage balances size and capacity, ideal for short to mid-length trips. It offers durability, portability, and organized storage, often featuring wheels and locks.",
      ImageUrl: [
        "https://th.bing.com/th/id/OIP.kVhiVdTq3Zr_vQrRPBQMHwHaCs?w=349&h=127&c=7&r=0&o=5&dpr=1.6&pid=1.7",
        "https://th.bing.com/th/id/OIP.KJ3UvJvvaz1x0N90ki2yxAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
    TSALockLuggae: {
      name: "TSALockLuggae",
      Description:
        "Secure, durable, TSA-approved, lockable, protective, convenient, reliable, airport-friendly, travel-safe, travel-friendly.",
      ImageUrl: [
        "https://www.shutterstock.com/image-photo/gdansk-poland-september-20-2016-260nw-490240792.jpg",
        "https://th.bing.com/th/id/OIP.KJ3UvJvvaz1x0N90ki2yxAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
    Backpacks: {
      name: "Backpacks",
      Description:
        "Versatile, portable, lightweight, spacious, durable, comfortable, stylish, adjustable, ergonomic, multi-purpose.",
      ImageUrl: [
        "https://skybags.co.in/cdn/shop/files/New_Desktop_Banner_1920x900_1_87_2048x.jpg?v=1714386326",
        "https://th.bing.com/th/id/OIP.KJ3UvJvvaz1x0N90ki2yxAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
    Duffles: {
      name: "Duffles",
      Description:
        "Spacious, flexible, lightweight, durable, portable, versatile, stylish, travel-friendly, expandable, convenient.",
      ImageUrl: [
        "https://cdn.shopify.com/s/files/1/2726/4990/articles/best-designer-duffle-bags.jpg?v=1663843454",
        "https://th.bing.com/th/id/OIP.KJ3UvJvvaz1x0N90ki2yxAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
    Accessories: {
      name: "Accessories",
      Description:
        "Essential, stylish, functional, compact, versatile, trendy, durable, portable, convenient, fashionable.",
      ImageUrl: [
        "https://th.bing.com/th/id/OIP.6_xGb_nl3NYyw0d3R9LlHgHaEU?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.KJ3UvJvvaz1x0N90ki2yxAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
    Handbags: {
      name: "Handbags",
      Description:
        "Elegant, stylish, portable, spacious, durable, fashionable, versatile, lightweight, trendy, convenient.",
      ImageUrl: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6df1bf57328315.59d20aa74f31b.png",
        "https://th.bing.com/th/id/OIP.KJ3UvJvvaz1x0N90ki2yxAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
    Slings: {
      name: "Slings",
      Description:
        "Compact, stylish, lightweight, portable, trendy, versatile, convenient, durable, hands-free, fashionable.",
      ImageUrl: [
        "https://th.bing.com/th/id/OIP.hVU493j_hW5xFM0EkSJlHwHaCs?w=193&h=80&c=7&r=0&o=5&dpr=1.6&pid=1.7",
        "https://th.bing.com/th/id/OIP.KJ3UvJvvaz1x0N90ki2yxAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.6&pid=1.7",
      ],
    },
  };
}
