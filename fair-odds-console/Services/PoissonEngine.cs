namespace FairOddsConsole.Services;

public class PoissonEngine
{
    public double PoissonProbability(int k, double lambda)
    {
        var probability = Math.Exp(-lambda) * Math.Pow(lambda, k) / Factorial(k);
        return probability;
    }

    private static double Factorial(int n)
    {
        if (n <= 1) return 1;
        double result = 1;
        for (var i = 2; i <= n; i++)
        {
            result *= i;
        }
        return result;
    }
}
