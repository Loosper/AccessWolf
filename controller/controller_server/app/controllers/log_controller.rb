class LogController < ApplicationController

  # POST /logs.json
  def create
    json = JSON.parse request.body.read

    @student = Student.where(:guid => json["uid"]).first
    if @student.nil?
      @teacher = Teacher.where(:guid => json["uid"]).first
      if !@teacher.nil? #found teacher
        @pastschedule = PastSchedule.where(:teacher_id => @teacher.id).first
        if !@pastschedule.nil?
          @pastschedule.over = true
          @pastschedule.save
        else
          @pastschedule = PastSchedule.new
          @pastschedule.teacher_id = @teacher.id
          @pastschedule.occurance_date = DateTime.now.to_s
          if @pastschedule.save!
            puts "Wohoo PastSchedule saved"
            head 200
          else
            head 400
          end
        end
      else #didnt find TEACHER
        head 401
      end
    else
      @currentattendance = CurrentAttendance.where(:student_id => @student.id).first

      if @currentattendance.nil? #GETTING IN
        @currentattendance = CurrentAttendance.new
        @currentattendance.student = @student
        @currentattendance.checkin = DateTime.now.to_s(:time)
        @currentattendance.room = json["room"]

        if @currentattendance.save!
          head 200
        else
          head 401
        end
      else #GETTING OUT
        @currentattendance.delete
        if @currentattendance.destroyed?

          @attendance = Attendance.new
          @attendance.date = DateTime.now.to_s
          @attendance.student_id = @student.id
          # @attendance.schedule = find_sch(@currentattendance.checkin, Time.now)
          # @attendance.attended = attended?(@attendance)
          @attended = nil
          find_sch
          if !@schedule.nil? #if u checked wihtout a schedule there u can fak of
            @attendance.schedule_id = @schedule.id
            @attendance.attended = @attended
            if !@attended.nil?
              if @attendance.save!
                head 200
              else
                head 402
              end
            end
          else
            head 300 #u nibba checked w/e u want not that it matters
          end
        else
          head 402
        end
      end
    end
  end

private

  def find_sch
    @schedule = Schedule.where(:room => @currentattendance.room).where("start_time >= ? AND end_time <= ?", @currentattendance.checkin.to_s(:time), DateTime.now.to_s(:time)).first

    if !@schedule.nil?
      @attended = "true"
    else
      @schedule = Schedule.where(:room => @currentattendance.room).where("start_time >= ? AND end_time <= ?", (@currentattendance.checkin - 15.minutes).to_s(:time), DateTime.now.to_s(:time)).first
      if !@schedule.nil?
        @attended = "late"
      end
    end
  end

end
