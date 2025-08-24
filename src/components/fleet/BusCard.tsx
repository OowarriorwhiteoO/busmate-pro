import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Bus, Calendar, Wrench, Star } from "lucide-react";

export interface BusData {
  id: string;
  ppu: string;
  marca: 'Volvo' | 'Scania' | 'Foton';
  modelo: 'Eléctrico' | 'Petróleo';
  caracteristicas: string;
  calefaccion: 'Si' | 'No';
  aireAcondicionado: 'Si' | 'No';
  defectos: string;
  fechaFalla?: Date;
}

interface BusCardProps {
  bus: BusData;
  isAdmin: boolean;
  onEdit: (bus: BusData) => void;
  onDelete: (id: string) => void;
}

export const BusCard = ({ bus, isAdmin, onEdit, onDelete }: BusCardProps) => {
  const getBrandColor = (marca: string) => {
    switch (marca) {
      case 'Volvo': return 'bg-blue-500';
      case 'Scania': return 'bg-red-500';
      case 'Foton': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getModelIcon = (modelo: string) => {
    return modelo === 'Eléctrico' ? '⚡' : '⛽';
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border border-border bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getBrandColor(bus.marca)}`}>
              <Bus className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                {bus.ppu}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {bus.marca}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {getModelIcon(bus.modelo)} {bus.modelo}
                </Badge>
              </div>
            </div>
          </div>
          {isAdmin && (
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(bus)}
                className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(bus.id)}
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {bus.caracteristicas && (
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>Características</span>
            </div>
            <p className="text-sm text-foreground line-clamp-2">
              {bus.caracteristicas}
            </p>
          </div>
        )}
        
        {/* Calefacción y Aire Acondicionado */}
        <div className="flex space-x-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              <span className="text-lg">🔥</span>
              <span>Calefacción</span>
            </div>
            <p className="text-sm text-foreground">
              {bus.calefaccion}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              <span className="text-lg">❄️</span>
              <span>Aire Acondicionado</span>
            </div>
            <p className="text-sm text-foreground">
              {bus.aireAcondicionado}
            </p>
          </div>
        </div>
        
        {bus.defectos && (
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm font-medium text-warning">
              <Wrench className="h-4 w-4" />
              <span>Defectos</span>
            </div>
            <p className="text-sm text-foreground line-clamp-2">
              {bus.defectos}
            </p>
          </div>
        )}
        
        {bus.fechaFalla && (
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Última Falla</span>
            </div>
            <p className="text-sm text-foreground">
              {bus.fechaFalla.toLocaleDateString('es-ES')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};