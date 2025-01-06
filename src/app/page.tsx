import { AuroraBackgroundWrapper } from "@/components/AuroraBg";
import { SalaryCalculator } from "@/components/SalaryCalculator";

export default function Home() {
  return (
    <AuroraBackgroundWrapper>
      <main className="min-w-screen flex min-h-screen flex-grow flex-col items-center justify-between gap-6 align-middle md:flex-row">
        <SalaryCalculator />
      </main>
    </AuroraBackgroundWrapper>
  );
}
