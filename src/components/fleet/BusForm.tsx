import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BusData } from "./BusCard";

interface BusFormProps {
  bus?: BusData;
  onSave: (bus: Omit<BusData, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export const BusForm = ({ bus, onSave, onCancel }: BusFormProps) => {
  const [formData, setFormData] = useState({
    ppu: '',
    marca: '' as 'Volvo' | 'Scania' | 'Foton' | '',
    modelo: '' as 'Eléctrico' | 'Petróleo' | '',
    caracteristicas: '',
    calefaccion: '' as 'Si' | 'No' | '',
    aireAcondicionado: '' as 'Si' | 'No' | '',
    defectos: '',
    fechaFalla: undefined as Date | undefined,
  });

  useEffect(() => {
    if (bus) {
      setFormData({
        ppu: bus.ppu,
        marca: bus.marca,
        modelo: bus.modelo,
        caracteristicas: bus.caracteristicas,
        calefaccion: bus.calefaccion,
        aireAcondicionado: bus.aireAcondicionado,
        defectos: bus.defectos,
        fechaFalla: bus.fechaFalla,
      });
    }
  }, [bus]);

  // Conditional logic for marca/modelo
  useEffect(() => {
    if (formData.marca === 'Volvo' || formData.marca === 'Scania') {
      setFormData(prev => ({ ...prev, modelo: 'Petróleo' }));
    } else if (formData.marca === 'Foton') {
      setFormData(prev => ({ ...prev, modelo: 'Eléctrico' }));
    }
  }, [formData.marca]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.marca || !formData.modelo || !formData.ppu) return;
    
    onSave({
      id: bus?.id,
      ppu: formData.ppu,
      marca: formData.marca as 'Volvo' | 'Scania' | 'Foton',
      modelo: formData.modelo as 'Eléctrico' | 'Petróleo',
      caracteristicas: formData.caracteristicas,
      calefaccion: formData.calefaccion as 'Si' | 'No',
      aireAcondicionado: formData.aireAcondicionado as 'Si' | 'No',
      defectos: formData.defectos,
      fechaFalla: formData.fechaFalla,
    });
  };

  const isModelDisabled = formData.marca !== '';

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-2xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {bus ? 'Editar Bus' : 'Agregar Nuevo Bus'}
            </h2>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PPU */}
            <div className="space-y-2">
              <Label htmlFor="ppu" className="text-sm font-medium">
                PPU (Patente) *
              </Label>
              <Input
                id="ppu"
                type="text"
                placeholder="Ej: ABC-123"
                value={formData.ppu}
                onChange={(e) => setFormData(prev => ({ ...prev, ppu: e.target.value }))}
                required
                className="uppercase"
              />
            </div>

            {/* Marca */}
            <div className="space-y-2">
              <Label htmlFor="marca" className="text-sm font-medium">
                Marca *
              </Label>
              <Select value={formData.marca} onValueChange={(value) => setFormData(prev => ({ ...prev, marca: value as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Volvo">Volvo</SelectItem>
                  <SelectItem value="Scania">Scania</SelectItem>
                  <SelectItem value="Foton">Foton</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Modelo */}
            <div className="space-y-2">
              <Label htmlFor="modelo" className="text-sm font-medium">
                Modelo *
              </Label>
              <Select 
                value={formData.modelo} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, modelo: value as any }))}
                disabled={isModelDisabled}
              >
                <SelectTrigger className={isModelDisabled ? "opacity-60" : ""}>
                  <SelectValue placeholder="Selecciona el modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eléctrico">⚡ Eléctrico</SelectItem>
                  <SelectItem value="Petróleo">⛽ Petróleo</SelectItem>
                </SelectContent>
              </Select>
              {isModelDisabled && (
                <p className="text-xs text-muted-foreground">
                  El modelo se selecciona automáticamente según la marca
                </p>
              )}
            </div>

            {/* Características */}
            <div className="space-y-2">
              <Label htmlFor="caracteristicas" className="text-sm font-medium">
                Características
              </Label>
              <Textarea
                id="caracteristicas"
                placeholder="Describe el equipamiento y características del bus..."
                value={formData.caracteristicas}
                onChange={(e) => setFormData(prev => ({ ...prev, caracteristicas: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Calefacción */}
            <div className="space-y-2">
              <Label htmlFor="calefaccion" className="text-sm font-medium">
                Calefacción *
              </Label>
              <Select value={formData.calefaccion} onValueChange={(value) => setFormData(prev => ({ ...prev, calefaccion: value as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="¿Tiene calefacción?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Si">🔥 Sí</SelectItem>
                  <SelectItem value="No">❌ No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Aire Acondicionado */}
            <div className="space-y-2">
              <Label htmlFor="aireAcondicionado" className="text-sm font-medium">
                Aire Acondicionado *
              </Label>
              <Select value={formData.aireAcondicionado} onValueChange={(value) => setFormData(prev => ({ ...prev, aireAcondicionado: value as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="¿Tiene aire acondicionado?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Si">❄️ Sí</SelectItem>
                  <SelectItem value="No">❌ No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Defectos */}
            <div className="space-y-2">
              <Label htmlFor="defectos" className="text-sm font-medium">
                Defectos
              </Label>
              <Textarea
                id="defectos"
                placeholder="Registra los defectos del vehículo..."
                value={formData.defectos}
                onChange={(e) => setFormData(prev => ({ ...prev, defectos: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Fecha de Falla */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Fecha de Última Falla
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.fechaFalla && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.fechaFalla ? (
                      format(formData.fechaFalla, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.fechaFalla}
                    onSelect={(date) => setFormData(prev => ({ ...prev, fechaFalla: date }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-primary to-secondary text-white"
                disabled={!formData.ppu || !formData.marca || !formData.modelo || !formData.calefaccion || !formData.aireAcondicionado}
              >
                <Save className="w-4 h-4 mr-2" />
                {bus ? 'Actualizar' : 'Crear'} Bus
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};