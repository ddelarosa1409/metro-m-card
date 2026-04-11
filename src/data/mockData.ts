export const mockUser = {
  nombre: "Daniel",
  apellido: "De La Rosa",
  initials: "DR",
  email: "daniel@metro.do",
  cedula: "001-1234567-8",
  phone: "+1 (809) 555-0142",
  balance: 350.0,
  cardUID: ["A1", "B2", "C3", "D4"],
  cardType: "MIFARE 1K",
};

export interface Transaction {
  id: string;
  type: "recarga" | "pasaje" | "auto-recarga";
  description: string;
  time: string;
  amount: number;
  positive: boolean;
  icon: "arrow-up" | "train" | "refresh-cw" | "cable-car";
  dateGroup: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "recarga",
    description: "Recarga manual",
    time: "Hoy 9:14 AM",
    amount: 200,
    positive: true,
    icon: "arrow-up",
    dateGroup: "Hoy",
  },
  {
    id: "2",
    type: "pasaje",
    description: "Pasaje Línea 1",
    time: "Hoy 7:30 AM",
    amount: 20,
    positive: false,
    icon: "train",
    dateGroup: "Hoy",
  },
  {
    id: "3",
    type: "auto-recarga",
    description: "Recarga automática",
    time: "Ayer 6:00 PM",
    amount: 100,
    positive: true,
    icon: "refresh-cw",
    dateGroup: "Ayer",
  },
  {
    id: "4",
    type: "pasaje",
    description: "Pasaje Línea 2",
    time: "Ayer 8:15 AM",
    amount: 20,
    positive: false,
    icon: "train",
    dateGroup: "Ayer",
  },
  {
    id: "5",
    type: "recarga",
    description: "Recarga manual",
    time: "Lun 6 abr 2:30 PM",
    amount: 500,
    positive: true,
    icon: "arrow-up",
    dateGroup: "Lunes 6 abr",
  },
  {
    id: "6",
    type: "pasaje",
    description: "Pasaje Teleférico",
    time: "Lun 6 abr 9:00 AM",
    amount: 20,
    positive: false,
    icon: "cable-car",
    dateGroup: "Lunes 6 abr",
  },
];

export const mockSavedCard = {
  last4: "4242",
  brand: "Visa",
  bank: "Banco Popular",
  holder: "DANIEL DE LA ROSA",
  expiry: "12/28",
};

export const rechargeAmounts = [
  { value: 50, trips: "~2 viajes" },
  { value: 100, trips: "~5 viajes" },
  { value: 200, trips: "~10 viajes" },
  { value: 500, trips: "~25 viajes" },
  { value: 1000, trips: "~50 viajes" },
];

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  dateGroup: string;
  icon: string;
  color: "green" | "blue" | "gray";
  unread: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Recarga exitosa",
    description: "Tu tarjeta fue recargada con RD$200",
    time: "hace 2 horas",
    dateGroup: "Hoy",
    icon: "arrow-up",
    color: "green",
    unread: true,
  },
  {
    id: "n2",
    title: "Saldo bajo",
    description: "Tu saldo está por debajo de RD$50. Recarga ahora.",
    time: "hace 5 horas",
    dateGroup: "Hoy",
    icon: "alert-triangle",
    color: "blue",
    unread: true,
  },
  {
    id: "n3",
    title: "Recarga automática",
    description: "Se recargaron RD$100 automáticamente",
    time: "ayer 6:00 PM",
    dateGroup: "Ayer",
    icon: "refresh-cw",
    color: "green",
    unread: false,
  },
  {
    id: "n4",
    title: "Acceso al Metro",
    description: "Pasaje descontado en Línea 1 - Centro de los Héroes",
    time: "ayer 7:30 AM",
    dateGroup: "Ayer",
    icon: "train",
    color: "gray",
    unread: false,
  },
];
