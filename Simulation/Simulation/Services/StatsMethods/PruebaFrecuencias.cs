using MathNet.Numerics.Distributions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Simulation.Services.StatsMethods
{
    public class PruebaFrecuencias
    {
        [JsonIgnore]
        public List<float> RandomList { get; set; }
        public List<float> LimitsInf { get; set; }
        public List<float> LimitsSup { get; set; }
        public List<int> FO { get; set; }
        public List<int> FE { get; set; }
        public List<float> FEFO { get; set; }
        public int N { get; set; }
        public float M { get; set; }
        public float ChiSquareCalc { get; set; }
        public float ChiSquareTable { get; set; }
        public bool EvenlyDistributed { get; set; }
        public float Inter { get; set; }

        private void CalculateLimits()
        {
            N = RandomList.Count;
            M = (float)(Math.Floor(Math.Sqrt(N)));
            float interval = M / N;
            Inter = interval;
            Console.WriteLine($"intervalo: {interval}");
            LimitsInf = new List<float>();
            LimitsSup = new List<float>();

            LimitsInf.Add(0);
            LimitsSup.Add(LimitsInf[0] + interval);

            for (int i = 1; i < M; i++)
            {
                LimitsInf.Add(LimitsSup[i-1]);
                LimitsSup.Add(LimitsInf[i] + interval);
            }
        }

        private void CalculateFO()
        {
            FO = new List<int>();
            for (int i=0; i<LimitsInf.Count; i++)
            {
                FO.Add(RandomList.Count(n => n >= LimitsInf[i] && n < LimitsSup[i]));
            }
        }

        private void CalculateFE()
        {
            FE = new List<int>();
            for (int i = 0; i < LimitsInf.Count; i++)
            {
                FE.Add((int)(N / M));
            }
        }

        public void CalculateChiSquare(float alpha)
        {
            CalculateLimits();
            CalculateFO();
            CalculateFE();
            // (FE-FO)^2 / FE
            ChiSquareCalc = 0;
            FEFO = new List<float>();
            for (int i=0; i<LimitsInf.Count; i++)
            {
                float val = (float)(Math.Pow(FE[i] - FO[i], 2) / FE[i]);
                FEFO.Add(val);
                ChiSquareCalc += val;
            }

            ChiSquared chi = new ChiSquared(M-1);
            ChiSquareTable = (float)chi.InverseCumulativeDistribution(alpha);

            if(ChiSquareCalc > ChiSquareTable)
            {
                EvenlyDistributed = false;
            }
            else
            {
                EvenlyDistributed = true;
            }
        }
    }
}
