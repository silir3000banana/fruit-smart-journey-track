export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_type: string
          batch_id: string | null
          created_at: string
          id: string
          is_read: boolean | null
          is_resolved: boolean | null
          message: string
          resolved_at: string | null
          severity: string
          target_role: Database["public"]["Enums"]["app_role"] | null
          target_user_id: string | null
          title: string
        }
        Insert: {
          alert_type: string
          batch_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          is_resolved?: boolean | null
          message: string
          resolved_at?: string | null
          severity?: string
          target_role?: Database["public"]["Enums"]["app_role"] | null
          target_user_id?: string | null
          title: string
        }
        Update: {
          alert_type?: string
          batch_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          is_resolved?: boolean | null
          message?: string
          resolved_at?: string | null
          severity?: string
          target_role?: Database["public"]["Enums"]["app_role"] | null
          target_user_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_stage_logs: {
        Row: {
          batch_id: string
          completed_at: string
          created_at: string
          geo_lat: number | null
          geo_lng: number | null
          humidity_percent: number | null
          id: string
          location: string | null
          metadata: Json | null
          notes: string | null
          quality_grade: string | null
          quality_score: number | null
          responsible_role: Database["public"]["Enums"]["app_role"] | null
          responsible_user_id: string | null
          stage: Database["public"]["Enums"]["batch_stage"]
          temperature_celsius: number | null
        }
        Insert: {
          batch_id: string
          completed_at?: string
          created_at?: string
          geo_lat?: number | null
          geo_lng?: number | null
          humidity_percent?: number | null
          id?: string
          location?: string | null
          metadata?: Json | null
          notes?: string | null
          quality_grade?: string | null
          quality_score?: number | null
          responsible_role?: Database["public"]["Enums"]["app_role"] | null
          responsible_user_id?: string | null
          stage: Database["public"]["Enums"]["batch_stage"]
          temperature_celsius?: number | null
        }
        Update: {
          batch_id?: string
          completed_at?: string
          created_at?: string
          geo_lat?: number | null
          geo_lng?: number | null
          humidity_percent?: number | null
          id?: string
          location?: string | null
          metadata?: Json | null
          notes?: string | null
          quality_grade?: string | null
          quality_score?: number | null
          responsible_role?: Database["public"]["Enums"]["app_role"] | null
          responsible_user_id?: string | null
          stage?: Database["public"]["Enums"]["batch_stage"]
          temperature_celsius?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_stage_logs_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      batches: {
        Row: {
          batch_id: string
          created_at: string
          current_quantity_kg: number
          current_stage: Database["public"]["Enums"]["batch_stage"]
          farm_id: string | null
          id: string
          is_active: boolean | null
          product_type: string
          quality_grade: string | null
          total_quantity_kg: number
          updated_at: string
          variety: string
        }
        Insert: {
          batch_id: string
          created_at?: string
          current_quantity_kg: number
          current_stage?: Database["public"]["Enums"]["batch_stage"]
          farm_id?: string | null
          id?: string
          is_active?: boolean | null
          product_type?: string
          quality_grade?: string | null
          total_quantity_kg: number
          updated_at?: string
          variety: string
        }
        Update: {
          batch_id?: string
          created_at?: string
          current_quantity_kg?: number
          current_stage?: Database["public"]["Enums"]["batch_stage"]
          farm_id?: string | null
          id?: string
          is_active?: boolean | null
          product_type?: string
          quality_grade?: string | null
          total_quantity_kg?: number
          updated_at?: string
          variety?: string
        }
        Relationships: [
          {
            foreignKeyName: "batches_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          acreage: number | null
          certifications: string[] | null
          created_at: string
          crop_types: string[] | null
          farm_name: string
          geo_lat: number | null
          geo_lng: number | null
          id: string
          location: string
          updated_at: string
          user_id: string
        }
        Insert: {
          acreage?: number | null
          certifications?: string[] | null
          created_at?: string
          crop_types?: string[] | null
          farm_name: string
          geo_lat?: number | null
          geo_lng?: number | null
          id?: string
          location: string
          updated_at?: string
          user_id: string
        }
        Update: {
          acreage?: number | null
          certifications?: string[] | null
          created_at?: string
          crop_types?: string[] | null
          farm_name?: string
          geo_lat?: number | null
          geo_lng?: number | null
          id?: string
          location?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      harvest_records: {
        Row: {
          batch_id: string
          created_at: string
          farm_id: string
          farmer_user_id: string
          field_id: string | null
          harvest_date: string
          id: string
          initial_quality_score: number | null
          moisture_content: number | null
          notes: string | null
          quantity_kg: number
          temperature_celsius: number | null
        }
        Insert: {
          batch_id: string
          created_at?: string
          farm_id: string
          farmer_user_id: string
          field_id?: string | null
          harvest_date: string
          id?: string
          initial_quality_score?: number | null
          moisture_content?: number | null
          notes?: string | null
          quantity_kg: number
          temperature_celsius?: number | null
        }
        Update: {
          batch_id?: string
          created_at?: string
          farm_id?: string
          farmer_user_id?: string
          field_id?: string | null
          harvest_date?: string
          id?: string
          initial_quality_score?: number | null
          moisture_content?: number | null
          notes?: string | null
          quantity_kg?: number
          temperature_celsius?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "harvest_records_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "harvest_records_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      post_harvest_records: {
        Row: {
          batch_id: string
          created_at: string
          grade_a_kg: number | null
          grade_b_kg: number | null
          grade_c_kg: number | null
          id: string
          notes: string | null
          packing_details: string | null
          processed_by_user_id: string | null
          processed_date: string
          rejected_kg: number | null
          sorted_quantity_kg: number | null
        }
        Insert: {
          batch_id: string
          created_at?: string
          grade_a_kg?: number | null
          grade_b_kg?: number | null
          grade_c_kg?: number | null
          id?: string
          notes?: string | null
          packing_details?: string | null
          processed_by_user_id?: string | null
          processed_date: string
          rejected_kg?: number | null
          sorted_quantity_kg?: number | null
        }
        Update: {
          batch_id?: string
          created_at?: string
          grade_a_kg?: number | null
          grade_b_kg?: number | null
          grade_c_kg?: number | null
          id?: string
          notes?: string | null
          packing_details?: string | null
          processed_by_user_id?: string | null
          processed_date?: string
          rejected_kg?: number | null
          sorted_quantity_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_harvest_records_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      retail_records: {
        Row: {
          batch_id: string
          created_at: string
          freshness_status: string | null
          id: string
          notes: string | null
          quantity_kg: number | null
          received_date: string
          remaining_shelf_life_days: number | null
          retail_user_id: string | null
          shelf_date: string | null
          shelf_life_days: number | null
          sold_kg: number | null
          store_location: string | null
          store_name: string
          updated_at: string
        }
        Insert: {
          batch_id: string
          created_at?: string
          freshness_status?: string | null
          id?: string
          notes?: string | null
          quantity_kg?: number | null
          received_date: string
          remaining_shelf_life_days?: number | null
          retail_user_id?: string | null
          shelf_date?: string | null
          shelf_life_days?: number | null
          sold_kg?: number | null
          store_location?: string | null
          store_name: string
          updated_at?: string
        }
        Update: {
          batch_id?: string
          created_at?: string
          freshness_status?: string | null
          id?: string
          notes?: string | null
          quantity_kg?: number | null
          received_date?: string
          remaining_shelf_life_days?: number | null
          retail_user_id?: string | null
          shelf_date?: string | null
          shelf_life_days?: number | null
          sold_kg?: number | null
          store_location?: string | null
          store_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "retail_records_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      ripening_records: {
        Row: {
          batch_id: string
          chamber_id: string | null
          created_at: string
          current_stage: string | null
          days_in_chamber: number | null
          end_date: string | null
          ethylene_ppm: number | null
          humidity_percent: number | null
          id: string
          manager_user_id: string | null
          notes: string | null
          ripening_method: string | null
          start_date: string
          temperature_celsius: number | null
          updated_at: string
        }
        Insert: {
          batch_id: string
          chamber_id?: string | null
          created_at?: string
          current_stage?: string | null
          days_in_chamber?: number | null
          end_date?: string | null
          ethylene_ppm?: number | null
          humidity_percent?: number | null
          id?: string
          manager_user_id?: string | null
          notes?: string | null
          ripening_method?: string | null
          start_date: string
          temperature_celsius?: number | null
          updated_at?: string
        }
        Update: {
          batch_id?: string
          chamber_id?: string | null
          created_at?: string
          current_stage?: string | null
          days_in_chamber?: number | null
          end_date?: string | null
          ethylene_ppm?: number | null
          humidity_percent?: number | null
          id?: string
          manager_user_id?: string | null
          notes?: string | null
          ripening_method?: string | null
          start_date?: string
          temperature_celsius?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ripening_records_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      transport_records: {
        Row: {
          arrival_time: string | null
          avg_temperature_celsius: number | null
          batch_id: string
          created_at: string
          departure_time: string | null
          destination_location: string
          driver_name: string | null
          estimated_arrival: string | null
          id: string
          logistics_user_id: string | null
          notes: string | null
          origin_location: string
          route_distance_km: number | null
          status: string | null
          temperature_breaches: number | null
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          arrival_time?: string | null
          avg_temperature_celsius?: number | null
          batch_id: string
          created_at?: string
          departure_time?: string | null
          destination_location: string
          driver_name?: string | null
          estimated_arrival?: string | null
          id?: string
          logistics_user_id?: string | null
          notes?: string | null
          origin_location: string
          route_distance_km?: number | null
          status?: string | null
          temperature_breaches?: number | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          arrival_time?: string | null
          avg_temperature_celsius?: number | null
          batch_id?: string
          created_at?: string
          departure_time?: string | null
          destination_location?: string
          driver_name?: string | null
          estimated_arrival?: string | null
          id?: string
          logistics_user_id?: string | null
          notes?: string | null
          origin_location?: string
          route_distance_km?: number | null
          status?: string | null
          temperature_breaches?: number | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transport_records_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      warehouse_records: {
        Row: {
          admin_user_id: string | null
          batch_id: string
          created_at: string
          fifo_position: number | null
          humidity_percent: number | null
          id: string
          inbound_date: string
          notes: string | null
          outbound_date: string | null
          quantity_kg: number | null
          status: string | null
          storage_zone: string | null
          temperature_celsius: number | null
          updated_at: string
          warehouse_location: string | null
          warehouse_name: string
        }
        Insert: {
          admin_user_id?: string | null
          batch_id: string
          created_at?: string
          fifo_position?: number | null
          humidity_percent?: number | null
          id?: string
          inbound_date: string
          notes?: string | null
          outbound_date?: string | null
          quantity_kg?: number | null
          status?: string | null
          storage_zone?: string | null
          temperature_celsius?: number | null
          updated_at?: string
          warehouse_location?: string | null
          warehouse_name: string
        }
        Update: {
          admin_user_id?: string | null
          batch_id?: string
          created_at?: string
          fifo_position?: number | null
          humidity_percent?: number | null
          id?: string
          inbound_date?: string
          notes?: string | null
          outbound_date?: string | null
          quantity_kg?: number | null
          status?: string | null
          storage_zone?: string | null
          temperature_celsius?: number | null
          updated_at?: string
          warehouse_location?: string | null
          warehouse_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "warehouse_records_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "farmer"
        | "packhouse_manager"
        | "ripening_manager"
        | "logistics_manager"
        | "warehouse_admin"
        | "retail_manager"
        | "quality_manager"
        | "admin"
        | "consumer"
      batch_stage:
        | "harvest"
        | "post_harvest"
        | "ripening"
        | "transport"
        | "warehouse"
        | "retail"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "farmer",
        "packhouse_manager",
        "ripening_manager",
        "logistics_manager",
        "warehouse_admin",
        "retail_manager",
        "quality_manager",
        "admin",
        "consumer",
      ],
      batch_stage: [
        "harvest",
        "post_harvest",
        "ripening",
        "transport",
        "warehouse",
        "retail",
      ],
    },
  },
} as const
