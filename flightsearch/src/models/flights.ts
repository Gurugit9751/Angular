export interface Flights {
    flightNo: string;
    origin: string;
    destination: string;
    orgincode: string;
    descode: string;
    time: ArrDepTime;
    date: string;
    amount: number;
}

interface ArrDepTime {
    depart: string;
    arrive: string;
}
