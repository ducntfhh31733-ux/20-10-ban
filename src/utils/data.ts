import { CoupleConfig, CouponItem, ReasonItem } from "@/types";

export const DEFAULT_CONFIG: CoupleConfig = {
  wifeName: "Thiên",
  husbandName: "Bạn của Thiên",
  startDate: "2023-08-06",
  letterTitle: "Gửi Thiên, cô gái đẹp và đầy dịu dàng 🌷",
  letterMessage: `Nhân ngày Phụ nữ Việt Nam 20/10, mình muốn gửi đến Thiên những lời chúc chân thành và tốt đẹp nhất.

Chúc Thiên luôn xinh đẹp, tự tin, có thật nhiều niềm vui và luôn hạnh phúc. Mong rằng mỗi ngày của bạn đều có những điều đáng yêu, những nụ cười thật tươi và những ước mơ dần trở thành hiện thực.

Cảm ơn Thiên vì đã là một người bạn đáng quý. Mong bạn luôn giữ được sự dịu dàng, nét đáng yêu và cá tính riêng của mình. À, cũng đừng quên rằng có một người bạn đã dành thời gian chuẩn bị món quà nhỏ này cho bạn nhé! Chúc Thiên có một ngày 20/10 thật vui vẻ! 💗🌸`,
  songUrl: "/music.mp3",
};

export const INITIAL_COUPONS: CouponItem[] = [
  {
    id: "coupon-1",
    title: "Chúc Bạn Luôn Xinh Đẹp 🌷",
    desc: "Chúc Thiên luôn xinh đẹp, rạng rỡ, tự tin và tỏa sáng theo cách riêng của mình. Mong nụ cười luôn nở trên môi bạn!",
    badge: "LUÔN XINH ĐẸP",
    iconName: "Sparkles",
    redeemed: false,
  },
  {
    id: "coupon-2",
    title: "Chúc Bạn Thật Nhiều Niềm Vui ☀️",
    desc: "Mong mỗi ngày của Thiên đều có thật nhiều tiếng cười, những điều thú vị và những khoảnh khắc đáng nhớ!",
    badge: "NIỀM VUI NGẬP TRÀN",
    iconName: "Utensils",
    redeemed: false,
  },
  {
    id: "coupon-3",
    title: "Chúc Bạn Luôn Hạnh Phúc 💗",
    desc: "Chúc Thiên luôn được yêu thương, trân trọng và có thật nhiều lý do để mỉm cười. Mong những điều tốt đẹp luôn đến với bạn!",
    badge: "HẠNH PHÚC MỖI NGÀY",
    iconName: "ShoppingBag",
    redeemed: false,
  },
  {
    id: "coupon-4",
    title: "Đừng Quên Một Người Nhé! ✨",
    desc: "Mong Thiên đừng quên rằng có một người bạn đã dành thời gian chuẩn bị món quà nhỏ này và luôn gửi đến bạn những lời chúc tốt đẹp!",
    badge: "ĐỪNG QUÊN NHÉ",
    iconName: "Award",
    redeemed: false,
  },
  {
    id: "coupon-5",
    title: "Chúc Bạn Luôn Gặp May Mắn 🍀",
    desc: "Chúc những điều may mắn luôn đồng hành cùng Thiên, mọi cố gắng đều được đền đáp và những ước mơ dần trở thành hiện thực!",
    badge: "MAY MẮN LUÔN BÊN",
    iconName: "Heart",
    redeemed: false,
  },
  {
    id: "coupon-6",
    title: "Chúc Bạn Luôn Là Chính Mình 🌸",
    desc: "Chúc Thiên luôn tự tin, mạnh mẽ, dịu dàng theo cách riêng và đủ can đảm để theo đuổi những điều mình yêu thích!",
    badge: "LUÔN RẠNG RỠ",
    iconName: "Flame",
    redeemed: false,
  },
];

export const REASONS_LIST: ReasonItem[] = [
  {
    id: 1,
    emoji: "✨",
    title: "Nụ cười rạng rỡ của Thiên",
    content:
      "Nụ cười của Thiên mang đến cảm giác vui vẻ và dễ chịu. Mong bạn luôn có thật nhiều lý do để cười thật tươi mỗi ngày.",
  },
  {
    id: 2,
    emoji: "🌷",
    title: "Vẻ đẹp dịu dàng",
    content:
      "Thiên là một cô gái đẹp và đầy dịu dàng. Mong bạn luôn tự tin, yêu quý bản thân và tỏa sáng theo cách riêng của mình.",
  },
  {
    id: 3,
    emoji: "🌸",
    title: "Sự đáng mến của Thiên",
    content:
      "Mong Thiên luôn giữ được sự chân thành, dịu dàng và những nét đáng yêu làm nên con người riêng của bạn.",
  },
  {
    id: 4,
    emoji: "☀️",
    title: "Những niềm vui nhỏ bé",
    content:
      "Chúc Thiên tìm thấy niềm vui trong những điều bình dị, từ một ngày đẹp trời đến những khoảnh khắc vui vẻ bên bạn bè.",
  },
  {
    id: 5,
    emoji: "💖",
    title: "Một người bạn đáng quý",
    content:
      "Tình bạn được tạo nên từ sự chân thành và những điều giản dị. Mong chúng ta sẽ có thêm nhiều kỷ niệm đẹp cùng nhau.",
  },
  {
    id: 6,
    emoji: "🎁",
    title: "Vì Thiên là chính Thiên",
    content:
      "Mong Thiên luôn tự tin với con người mình, kiên trì với những điều mình yêu thích và đón nhận thật nhiều điều tốt đẹp.",
  },
];

export const SWEET_COMPLIMENTS = [
  "Thiên hôm nay trông thật rạng rỡ và đáng yêu! 🌷",
  "Chúc bạn luôn xinh đẹp, tự tin và tỏa sáng theo cách riêng! ✨",
  "Mong hôm nay của Thiên có thật nhiều niềm vui và tiếng cười! ☀️",
  "Chúc bạn luôn hạnh phúc và gặp thật nhiều điều tốt lành! 💗",
  "Thiên là một cô gái đẹp và đầy dịu dàng. Hãy luôn tự tin nhé! 🌸",
  "Mong mọi ước mơ của Thiên sẽ dần trở thành hiện thực! 🌟",
  "Chúc bạn luôn gặp may mắn trên con đường mình lựa chọn! 🍀",
  "Mong Thiên luôn có những người bạn chân thành bên cạnh! 🫶",
  "Chúc bạn có thật nhiều khoảnh khắc đáng nhớ và vui vẻ! 🎉",
  "Đừng quên nhé, có một người bạn đã chuẩn bị món quà nhỏ này dành cho Thiên! 🎁",
];