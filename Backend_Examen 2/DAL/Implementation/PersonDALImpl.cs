using DAL.Interfaces;
using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Implementation
{
    public class PersonDALImpl : GenericDALImpl<Person>, IPersonDAL
    {
        QuizContext context;

        public PersonDALImpl(QuizContext context) : base(context)
        {
            this.context = context;
        }

    }
}
