using Simulation.Services.ExcelOp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Services.StatsMethods
{
    public class PruebaPromedios
    {
        public List<float> RandomList { get; set; }
        public float X { get; set; }
        public float Alpha { get; set; }
       // public float AlphaByTwo { get; set; }
        public float Z { get; set; }

        public float CalculateLimitInferior()
        {
            Z = TableFile.ReadFile(1 - (Alpha / 2));

            return (float)(0.5 - (Z) / Math.Sqrt(12 * RandomList.Count));
        }

        public float CalculateLimitSuperior()
        {
            return (float)(0.5 + (Z) / Math.Sqrt(12 * RandomList.Count));
        }

        public bool areEvenlyDistributed()
        {
            float limitInf = CalculateLimitInferior();
            float limitSup = CalculateLimitSuperior();

            X = RandomList.Sum() / RandomList.Count;

            if (X >= limitInf && X <= limitSup )
            {
                return true;
            }

            return false;
        }
    }
}
