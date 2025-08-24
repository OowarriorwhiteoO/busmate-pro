import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusCard, BusData } from "./BusCard";
import { BusForm } from "./BusForm";
import { Plus, Search, Bus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FleetDashboardProps {
  userRole: 'admin' | 'user';
}

// Mock data
const mockBuses: BusData[] = [
  {
    id: '1',
    ppu: 'ABC-123',
    marca: 'Volvo',
    modelo: 'Petróleo',
    caracteristicas: 'Sistema de aire acondicionado, asientos reclinables, sistema de audio y video, GPS integrado.',
    fallas: 'Problema menor en sistema de frenos resuelto en mantenimiento.',
    cualidades: 'Excelente rendimiento de combustible, muy cómodo para pasajeros de larga distancia.',
    fechaFalla: new Date('2024-01-15'),
  },
  {
    id: '2',
    ppu: 'DEF-456',
    marca: 'Foton',
    modelo: 'Eléctrico',
    caracteristicas: 'Batería de larga duración, carga rápida, sistema de climatización eficiente, pantallas digitales.',
    fallas: 'Ninguna falla registrada.',
    cualidades: 'Cero emisiones, funcionamiento silencioso, bajo costo operativo.',
  },
  {
    id: '3',
    ppu: 'GHI-789',
    marca: 'Scania',
    modelo: 'Petróleo',
    caracteristicas: 'Motor Euro 6, suspensión neumática, sistema de entretenimiento a bordo.',
    fallas: 'Falla en sistema eléctrico menor, reparada.',
    cualidades: 'Alta durabilidad, excelente para rutas urbanas pesadas.',
    fechaFalla: new Date('2024-02-20'),
  },
];

export const FleetDashboard = ({ userRole }: FleetDashboardProps) => {
  const [buses, setBuses] = useState<BusData[]>(mockBuses);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBus, setEditingBus] = useState<BusData | undefined>();
  const { toast } = useToast();

  const filteredBuses = buses.filter(bus =>
    bus.ppu.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveBus = (busData: Omit<BusData, 'id'> & { id?: string }) => {
    if (busData.id) {
      // Update existing bus
      setBuses(prev => prev.map(bus => bus.id === busData.id ? { ...busData, id: busData.id } : bus));
      toast({
        title: "Bus actualizado",
        description: `El bus ${busData.ppu} ha sido actualizado exitosamente.`,
      });
    } else {
      // Add new bus
      const newBus: BusData = {
        ...busData,
        id: Date.now().toString(),
      };
      setBuses(prev => [...prev, newBus]);
      toast({
        title: "Bus agregado",
        description: `El bus ${busData.ppu} ha sido agregado a la flota.`,
      });
    }
    setShowForm(false);
    setEditingBus(undefined);
  };

  const handleEditBus = (bus: BusData) => {
    setEditingBus(bus);
    setShowForm(true);
  };

  const handleDeleteBus = (id: string) => {
    const bus = buses.find(b => b.id === id);
    setBuses(prev => prev.filter(bus => bus.id !== id));
    toast({
      title: "Bus eliminado",
      description: `El bus ${bus?.ppu} ha sido eliminado de la flota.`,
      variant: "destructive",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Gestión de Flota
            </h1>
            <p className="text-muted-foreground">
              {userRole === 'admin' ? 'Administra tu flota de buses' : 'Consulta la información de la flota'}
            </p>
          </div>
          {userRole === 'admin' && (
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Bus
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por PPU, marca o modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Buses</p>
              <p className="text-2xl font-bold text-foreground">{buses.length}</p>
            </div>
            <Bus className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Eléctricos</p>
              <p className="text-2xl font-bold text-success">{buses.filter(b => b.modelo === 'Eléctrico').length}</p>
            </div>
            <span className="text-2xl">⚡</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Petróleo</p>
              <p className="text-2xl font-bold text-warning">{buses.filter(b => b.modelo === 'Petróleo').length}</p>
            </div>
            <span className="text-2xl">⛽</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Con Fallas</p>
              <p className="text-2xl font-bold text-destructive">{buses.filter(b => b.fechaFalla).length}</p>
            </div>
            <span className="text-2xl">⚠️</span>
          </div>
        </div>
      </div>

      {/* Bus Grid */}
      {filteredBuses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuses.map((bus) => (
            <BusCard
              key={bus.id}
              bus={bus}
              isAdmin={userRole === 'admin'}
              onEdit={handleEditBus}
              onDelete={handleDeleteBus}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-muted-foreground mb-2">
            No se encontraron buses
          </p>
          <p className="text-muted-foreground">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Agrega tu primer bus a la flota'}
          </p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <BusForm
          bus={editingBus}
          onSave={handleSaveBus}
          onCancel={() => {
            setShowForm(false);
            setEditingBus(undefined);
          }}
        />
      )}
    </div>
  );
};