using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Services.RandomNums
{
    public interface IPseudoRandomNums
    {
        public float X0 { get; set; }
        public float a { get; set; }
        public float c { get; set; }
        public float M { get; set; }

        public List<float> GenerateNumbers();
    }
}
