import { useState, useEffect } from "react"
import { Monitor, Clock, MapPin, User, Calendar, Users, Award, BookOpen, GraduationCap } from "lucide-react"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const formattedDate = currentTime.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Examen 2</h1>
            <p className="text-gray-600 capitalize">{formattedDate}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 border border-gray-200">
            <Clock className="h-5 w-5 text-slate-600" />
            <div className="text-right">
              <div className="font-mono text-lg font-semibold text-gray-800">{formattedTime}</div>
              <div className="text-xs text-gray-500">Hora actual</div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-200">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 h-28 relative">
            <div className="absolute -bottom-14 left-8 bg-white p-4 rounded-2xl shadow-xl border-4 border-white">
              <Monitor className="h-14 w-14 text-slate-700" />
            </div>
            <div className="absolute top-6 right-8 flex gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-white text-sm font-medium">Activo</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">EXAMEN 2 FUNDAMENTOS WEB</h2>
              <div className="flex flex-wrap items-center gap-3 text-gray-600">
                <span className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-full text-sm">
                  Código: OPT
                </span>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>3 Créditos</span>
                </span>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Student Profile */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl p-3 shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Perfil del Estudiante</h3>
                </div>
              </div>
              <div className="ml-16">
                <p className="text-gray-500 text-sm mb-2">Estudiante</p>
                <p className="text-2xl font-bold text-gray-800 mb-1">Erick Torres Hernandez</p>
                <p className="text-gray-600">ID: 208530470</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Academic Info */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-3 shadow-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Información Académica</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Período Académico</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Semestre I - 2024
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Modalidad</p>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-blue-600" />
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Presencial
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-3 shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Ubicación</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Sede Interuniversitaria de Alajuela</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                        Universidad Nacional de Costa Rica
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-3 shadow-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Equipo Docente</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Profesor</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-amber-600" />
                      <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                        Juan Pablo Ramos Peñaranda
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Examen 2 Fundamentos Web • {currentTime.getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}