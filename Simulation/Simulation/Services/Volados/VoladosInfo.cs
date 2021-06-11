using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Services.Volados
{
    public class VoladosInfo
    {
        public int Run { get; set; }
        public int BeforeVolado { get; set; }
        public int Bet { get; set; }
        public float RandomNum { get; set; }
        public bool Win { get; set; }
        public int AfterVolado { get; set; }
        public bool Goal { get; set; }
    }
}
