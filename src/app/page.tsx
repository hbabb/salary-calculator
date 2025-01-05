import { AuroraBackgroundWrapper } from "@/components/AuroraBg";
import { SalaryCalculator } from "@/components/SalaryCalculator";

export default function Home() {
  return (
    <AuroraBackgroundWrapper>
      <main className="min-w-screen flex min-h-screen flex-grow flex-col items-center justify-center align-middle">
        <SalaryCalculator />
      </main>
    </AuroraBackgroundWrapper>
  );
}
